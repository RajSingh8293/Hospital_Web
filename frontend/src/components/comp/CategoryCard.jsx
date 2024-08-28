/* eslint-disable react/prop-types */


const CategoryCard = ({ item }) => {
    return (
        <>
            <div className="">
                <div className=" p-4 flex justify-center items-center flex-col ">
                    <h1 className="text-blue-500 text-2xl">{item?.logo}</h1>
                    <h1 className="text-xl">{item?.categoryName}</h1>
                    <p className="opacity-50">({item?.jobs})</p>
                </div>
            </div>
        </>

    )
}

export default CategoryCard