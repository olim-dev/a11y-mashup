import React, { useRef, useEffect } from 'react';
import useNebula from 'hooks/useNebula';


const Bar = () => {

    const nebula = useNebula();
    const elementRef = useRef();
    const vizRef = useRef();

    useEffect( () => {
        if (!nebula) return;

        async function render() {
            vizRef.current = await nebula.render({
                element: elementRef.current,
                type: 'custom-bar-d3',  // custom d3 bar chart
                // type: 'barchart',   // sn-bar-chart
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
                            qLabel: 'Opportunity Amount',
                        },
                    },
                ],
                properties: {
                    title: 'Sales by region',
                    subtitle: 'Subtitle goes here',
                },
            });
        }
        render();
      }, [nebula]);


      const handleKeyDown = (e) => {
          if (e.which === 13) {
              vizRef.current.convertTo('table');        
          }
          if(e.which === 27) {
              vizRef.current.convertTo('bar');
          }
      }

    return (
       <div>
            <h3>Custom Bar Chart using nebula/d3</h3>
            <p>A description of the chart that explains in detail the chart for screen readers</p>
            <div className="sr-only">[This text is hidden for screen readers only] Explain here how to toggle between the chart view and the data table view by clicking on the Enter key and the Escape key and navigating the rows with Up/Down arrows.</div>
            <div id="barViz" ref={elementRef} style={{ height: 550}} onKeyDown={handleKeyDown} aria-label="HELLO THERE"></div>
        </div>
    );
}

export default Bar;