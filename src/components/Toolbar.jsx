import React, { useEffect, useRef } from 'react';
import useNebula from 'hooks/useNebula';

const Toolbar = () => {
    const toolbarRef = useRef();
    const nebula = useNebula();

    useEffect(async () => {  
        if (!nebula) return;
        await nebula.selections().then((s) => s.mount(toolbarRef.current));
    }, [nebula]);

    return (
        <div ref={toolbarRef} tabIndex={0}></div>
    );
}

export default Toolbar;