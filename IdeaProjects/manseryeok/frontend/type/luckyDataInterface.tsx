import { CheonganType, JijiType, SipsinType } from './basicType';

export interface DaeunData {
    daeunNum: number;
    gan: CheonganType;
    jiji: JijiType;
    ganSipsin: SipsinType;
    jijiSipsin: SipsinType;
    woonsung: string;
    sinsal: string;
}
