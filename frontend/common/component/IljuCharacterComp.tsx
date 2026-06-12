import Image from 'next/image';

/** Custom */
import { cheongan } from '@/common/const/cheonganConst';
import { ohaeng } from '@/common/const/ohaengConst';
import { makeBgColorAlpha } from '@/common/util/colorFunc';

/** Type & Interface */
import { CheonganType, JijiType } from '@/common/type/basicType';

export default function IljuCharacterComp({ gan, jiji }: { gan: CheonganType; jiji: JijiType }) {
    return (
        <div
            className={`relative flex justify-center items-center w-32 h-32 rounded-full ${makeBgColorAlpha(ohaeng[cheongan[gan].element].color)}`}
        >
            <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full p-2">
                <Image
                    src={`/svg/character/${gan + jiji}.svg`}
                    width={140}
                    height={140}
                    alt="일주 동물 이미지"
                    style={{ zIndex: 2 }}
                    unoptimized
                />
            </div>
        </div>
    );
}
