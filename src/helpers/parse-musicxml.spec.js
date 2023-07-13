import chai, { expect } from '@esm-bundle/chai';
import chaiAsPromised from '@esm-bundle/chai-as-promised';
import { parseMusicXML } from '../../dist/musicxml-player.esm';

chai.use(chaiAsPromised);

describe('parseMusicXML', () => {
  it('correctly parses uncompressed MusicXML', async () => {
    await expect(
      parseMusicXML(
        `
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!DOCTYPE score-partwise PUBLIC
        "-//Recordare//DTD MusicXML 4.0 Partwise//EN"
        "http://www.musicxml.org/dtds/partwise.dtd">
    <score-partwise version="4.0">
      <part-list>
        <score-part id="P1">
          <part-name>Music</part-name>
        </score-part>
      </part-list>
      <part id="P1">
        <measure number="1">
          <attributes>
            <divisions>1</divisions>
            <key>
              <fifths>0</fifths>
            </key>
            <time>
              <beats>4</beats>
              <beat-type>4</beat-type>
            </time>
            <clef>
              <sign>G</sign>
              <line>2</line>
            </clef>
          </attributes>
          <note>
            <pitch>
              <step>C</step>
              <octave>4</octave>
            </pitch>
            <duration>4</duration>
            <type>whole</type>
          </note>
        </measure>
      </part>
    </score-partwise>
    `.trim(),
      ),
    ).to.not.be.rejectedWith();
  });

  it('correctly throws on invalid MusicXML', async () => {
    await expect(
      parseMusicXML(
        `
THIS IS NOT MUSICXML
    `.trim(),
      ),
    ).to.be.rejectedWith();
  });
});
