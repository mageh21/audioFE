import type { IMidiFile } from 'midi-json-parser-worker';
import type { IMidiConverter, MeasureTimemap } from './IMidiConverter';
/**
 * Implementation of IMidiConverter that simply fetches given MIDI file and timemap JSON file URIs.
 *
 * The timemap JSON file can be generated using the script midi-timemap which is distributed with musicxml-midi
 * @see https://github.com/infojunkie/musicxml-midi/blob/main/src/js/midi-timemap.js
 * ASSUMPTION The MIDI file is itself generated using musicxml-midi.
 *
 * The timemap JSON structure is simple enough to be generated by other tools as well.
 */
export declare class FetchConverter implements IMidiConverter {
    protected _midiOrUri: IMidiFile | string;
    protected _timemapOrUri?: (MeasureTimemap | string) | undefined;
    protected _timemap?: MeasureTimemap;
    protected _midi?: IMidiFile;
    constructor(_midiOrUri: IMidiFile | string, _timemapOrUri?: (MeasureTimemap | string) | undefined);
    initialize(musicXml: string): Promise<void>;
    get midi(): IMidiFile;
    get timemap(): MeasureTimemap;
    get version(): string;
    /**
     * Parse a MusicXML score into a timemap.
     */
    protected static _parseTimemap(musicXml: string): Promise<MeasureTimemap>;
}
//# sourceMappingURL=FetchConverter.d.ts.map