import type { ISheetPlayback } from './ISheetPlayback';
import type { MeasureNumber, MillisecsTimestamp, Player } from './Player';
import createVerovioModule from 'verovio/wasm';
import { VerovioToolkit } from 'verovio/esm';

interface TimeMapEntryFixed {
  tstamp: number;
  qstamp: number;
  on?: string[];
  off?: string[];
  restsOn?: string[];
  restsOff?: string[];
  tempo?: number;
  measureOn: string;
}

interface ElementsAtTimeFixed {
  notes: string[];
  rests: string[];
  chords: string[];
  page: number;
  measure: string;
}

export class VerovioPlayback implements ISheetPlayback {
  private vrv: VerovioToolkit | null;
  private player: Player | null;
  private notes: Array<string>;
  private measures: Array<{ timestamp: MillisecsTimestamp }>;

  constructor() {
    this.vrv = null;
    this.player = null;
    this.notes = [];
    this.measures = [];
  }

  version(): string {
    if (!this.vrv) throw 'TODO';
    return `verovio v${this.vrv.getVersion()}`;
  }

  async initialize(
    player: Player,
    container: HTMLDivElement | string,
    musicXml: string,
  ): Promise<void> {
    this.player = player;

    const VerovioModule = await createVerovioModule();
    this.vrv = new VerovioToolkit(VerovioModule);
    const svg = this.vrv.renderData(musicXml, {
      breaks: 'encoded',
      adjustPageHeight: true,
      scale: 50,
    });
    if (typeof container === 'string') {
      document.getElementById(container)!.innerHTML = svg;
    } else if (container instanceof HTMLDivElement) {
      container.innerHTML = svg;
    }

    // Build measure timemap and setup event listeners on notes.
    this.vrv
      .renderToTimemap({ includeMeasures: true, includeRests: true })
      .forEach((e) => {
        const event = <TimeMapEntryFixed>e;
        if ('measureOn' in event) {
          this.measures.push({
            timestamp: event.tstamp,
          });
        }
        const measureIndex = this.measures.length - 1;
        [...(event.on || []), ...(event.restsOn || [])].forEach((noteid) => {
          document.getElementById(noteid)!.addEventListener('click', () => {
            const measureMillisecs =
              event.tstamp - this.measures[measureIndex].timestamp;
            this.seek(measureIndex, measureMillisecs + 1);
            this.player!.move(measureIndex, measureMillisecs);
          });
        });
      });
    this.seek(0, 0);
  }

  seek(
    measureIndex: MeasureNumber,
    measureMillisecs: MillisecsTimestamp,
  ): void {
    const timestamp = Math.max(
      0,
      Math.min(
        measureIndex < this.measures.length - 1
          ? this.measures[measureIndex + 1].timestamp
          : this.measures[measureIndex].timestamp + measureMillisecs,
        this.measures[measureIndex].timestamp + measureMillisecs,
      ),
    );
    const elements = <ElementsAtTimeFixed>(
      this.vrv!.getElementsAtTime(timestamp)
    );
    const notes = [...elements.notes, ...elements.rests];
    if (notes.length > 0 && this.notes != notes) {
      this.notes.forEach((noteid) => {
        if (!notes.includes(noteid)) {
          const note = document.getElementById(noteid)!;
          note.setAttribute('fill', '#000');
          note.setAttribute('stroke', '#000');
        }
      });
      this.notes = notes;
      this.notes.forEach((noteid) => {
        const note = document.getElementById(noteid)!;
        note.setAttribute('fill', '#c00');
        note.setAttribute('stroke', '#c00');
      });
    }
  }
}
