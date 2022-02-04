import React, { useEffect, useRef } from 'react';
import useNebula from 'hooks/useNebula';


const ListBox = () => {
    const listboxRef = useRef();
    const nebula = useNebula();

    useEffect(async () => {
        if(!nebula) return;

        const fieldName = 'Account Billing Country';
        const options = {
            title: "Country"
        };

        const field = await nebula.field(fieldName);

        field.mount(listboxRef.current, options);        

    }, [nebula]);

    return (
        <div ref={listboxRef} style={{height: 300}}></div>
    );
}

export default ListBox;
