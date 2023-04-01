import React from "react";
import CardItem from "./CardItem";
import { useState, useEffect } from "react";
import "../../styles/containerCardsItems.css"
import MoonLoader from "react-spinners/ClipLoader";
import { getFirestore, collection, getDocs } from 'firebase/firestore';



// let {idCategory} = useParams()
// [idCategory]
const ContainerCardItems = () => {
    const [ items, setItems ] = useState( [] );

    useEffect(() => {
        const db= getFirestore();
        const itemCollection = collection( db, 'items');

        getDocs(itemCollection).then( (snapshotList) =>{
            const docs = snapshotList.docs.map((snapshot) => ({
                id: snapshot.id,
              ...snapshot.data(),
            }));
            setItems(docs);
        });
    }, []);
        




    return(
        <div className="containerCardItems">
            {
                (items.length === 0 ) ? <div className="containerSpinner"> <MoonLoader color="#5b00fb" /> </div>
                : items.map( product => (
                    <CardItem 
                        key={product.id}
                        id={product.id}
                        imagen={product.imageProduct.firtsImage}
                        title={product.title}
                        cantidad={product.stock}
                        precio={product.price}
                    />  
                ))
            }
        </div>      
    )
}

export default ContainerCardItems;