
export const Card = ({owner, imageUrl}) => {
 
    return (
        <div className="w-full rounded overflow-hidden shadow-lg m-2">
            <img className="w-full h-64 object-center" alt="" src={imageUrl} />
            <div className="px-6 py-4">
                <div className="font-regular text-xl mb-2">{owner}</div>
            </div>
        </div>
    );
}