import Xmove from '../audio/Xmove.mp3';
import Omove from '../audio/Omove.mp3';
import revealed from '../audio/revealed.mp3';
import menu from '../audio/menu.mp3';
import countDownA from '../audio/countDownA.mp3';
import countDownB from '../audio/countDownB.mp3';
import taDah from '../audio/taDah.mp3';
import looser from '../audio/looser.mp3';
import roundWin from '../audio/roundWin.mp3';
import roundLost from '../audio/roundLost.mp3';
import trill from '../audio/trill.mp3';
import ticTac3Sec from '../audio/ticTac3Sec.mp3';
import startRound from '../audio/startRound.mp3';
import tied from '../audio/tied.mp3';
import tiedWeird from '../audio/tiedWeird.mp3';
import XTime from '../audio/XTime.mp3';
import OTime from '../audio/OTime.mp3';
import bG from '../audio/bG.mp3';

const aF: any = { // audioFiles
  Xmove: { n: Xmove, i: 0, mV: 0.6 }, // n = name
  Omove: { n: Omove, i: 1, mV: 0.6 }, // i = index
  revealedOne: { n: revealed, i: 2, mV: 0.3 }, // mV = maxVolume
  revealedTwo: { n: revealed, i: 3, mV: 0.5 },
  menu: { n: menu, i: 4, mV: 0.5 },
  countDownA: { n: countDownA, i: 5, mV: 0.5 },
  countDownB: { n: countDownB, i: 6, mV: 0.4 },
  taDah: { n: taDah, i: 7, mV: 0.8 },
  looser: { n: looser, i: 8, mV: 0.7 },
  roundWin: { n: roundWin, i: 9, mV: 1.0 },
  roundLost: { n: roundLost, i: 10, mV: 0.6 },
  trill: { n: trill, i: 11, mV: 0.9 },
  ticTac3Sec: { n: ticTac3Sec, i: 12, mV: 0.1 },
  startRound: { n: startRound, i: 13, mV: 0.2 },
  tied: { n: tied, i: 14, mV: 1.0 },
  tiedWeird: { n: tiedWeird, i: 15, mV: 0.9 },
  XTime: { n: XTime, i: 16, mV: 1.0 },
  OTime: { n: OTime, i: 17, mV: 1.0 },
  bG: { n: bG, i: 18, mV: 1.0 }
}

export default aF;

// background:
// 1  00:00 ***
// 2  00:12
// 3  00:24
// 4  00:35
// 5  00:47 ***
// 6  00:59
// 7  01:12
// 8  01:24
// 9  01:36 ***
// 10 01:48
// 11 01:59
// 12 02:11
// 13 02:23 ***
// 14 02:35
// 15 02:47
// 16 02:59 // 03:12