"use client";

import { useEffect } from "react";

export default function AddBootstrap()
{
    useEffect(()=>{
        import( "bootstrap/dist/js/bootstrap.min.js");
    },[])
    return <></>
}