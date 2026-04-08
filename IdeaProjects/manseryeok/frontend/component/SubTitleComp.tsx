export default function SubTitleComp({ text }: { text: string }) {
    return (
        <div className={`flex items-center w-full h-10 px-2 pb-3`}>
            <h3 className="font-extrabold text-xl">{text}</h3>
        </div>
    );
}
