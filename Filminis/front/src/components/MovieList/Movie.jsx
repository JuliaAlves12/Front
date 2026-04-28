
import { useEffect, useState } from "react";
import { filmeID } from  "../../services/api";

export default function Movie(){



    const [filme, setFilme] = useState(null)
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState("")

    useEffect(() => {
        async function carregarFilme(){
            try{
                setLoading(true)
                setErro("")

                const dados = await filmeID(id);

                if(! dados){
                    throw new Error("Filme não encontrado")
                }

                setFilme(dados)
            } catch(erro){
                setErro(erro.message)
            } finally{
                setLoading(false);
            }
        }
        if (id){
            carregarFilme();
        }
    }, [id])
}