import React, { useEffect, useState } from 'react'

const Card = ({ name, url }) => {
    const [type, getType] = useState([]);
    const [hp, gethp] = useState("");
    const [attack, setAttack] = useState([]);
    const [defense, setDefense] = useState([]);
    const [specialAttack, setSpecialAttack] = useState([]);
    const [urlImage, setUrlImage] = useState("");

    const getPokemon = async () => {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            getType(data.types);
            gethp(data.stats[0].base_stat);
            setAttack(data.stats[1].base_stat);
            setDefense(data.stats[2].base_stat);
            setSpecialAttack(data.stats[3].base_stat);
            setUrlImage(data.sprites.other["official-artwork"].front_default);
            //setUrlImage(data.sprites.other.official_artwork.front_default);
            //console.log(data.types.map(typen => typen.type.name));
            //console.log();
        }
        else {
            console.error('Error fetching data:', response.statusText);
        }
    }

    useEffect(() => {
        //Obtener la info edl pokemon
        getPokemon();
    }, [url])
    return (
        <div className='w-96 bg-[#232323] rounded-xl m-2 shadow-xl/30 border-4 text-white hover:scale-101 hover:shadow-2xl transition-all duration-300'>
            <div className='bg-[#6f6f6f] rounded-t-md p-10'>
                <img className='' src={urlImage} />
            </div>
            <div className="p-5">
                <div className='flex justify-center'>
                    <h2 className='uppercase text-xl'>{name}</h2>
                </div>
                <div className='flex flex-row justify-center gap-2'>
                    {type.map((type, index) => {
                        return (
                            <div key={index} className=''>
                                {type.type.name}
                            </div>
                        )
                    })}
                </div>
                
            </div>
        </div>
    )
}

export default Card