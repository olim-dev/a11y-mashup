import React, { useRef, useEffect } from 'react';
import useNebula from 'hooks/useNebula';
import { linePluginNew } from './plugins';

const Line = () => {

    const nebula = useNebula();
    const elementRef = useRef();
    const vizRef = useRef();

    useEffect(() => {
        if (!nebula) return;

        async function render() {
            vizRef.current = await nebula.render({
                element: elementRef.current,
                type: 'line',
                plugins: [linePluginNew],
                fields: [
                    {
                        qDef: {
                            qFieldDefs: ['[Account Billing Country]'],
                            qFieldLabels: ['Country'],
                            autoSort: false,
                            qSortCriterias: [
                                {
                                    qSortByExpression: -1,
                                    qExpression: {
                                        qv: 'Sum([Opportunity Amount])',
                                    },
                                },
                            ],
                        },
                    },
                    {
                        qDef: {
                            qDef: 'Sum([Opportunity Amount])',
                            qLabel: 'Opportunity Amount HERE',
                        },
                    },
                ],
                properties: {
                    title: 'Sales by region',
                },
            });
        }
        render();
    }, [nebula]);


    return (
        <>
            <h3>Nebula.js Rendered Line Chart</h3>
            <p>A description of the chart that explains in detail the chart for screen readers</p>
            <div className="sr-only">[This text is hidden for screen readers only] Explain here how to toggle between the chart view and the data table view by clicking on the Enter key and the Escape key and navigating the rows with Up/Down arrows.</div>
            <div id="barViz" ref={elementRef} style={{ height: 500 }} onKeyDown={handleKeyDown}></div>
        </>
    );
}

export default Line;