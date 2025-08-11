import React from 'react';
import { CalculationData } from './types';

interface CalculationContentProps {
  data: CalculationData;
}

export const CalculationContent: React.FC<CalculationContentProps> = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px'
    }}>
      <h3 style={{
        fontSize: '14px',
        marginBottom: '15px',
        textAlign: 'center'
      }}>
        けいさんもんだい
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        width: '100%',
        maxWidth: '180px'
      }}>
        {data.problems.map(problem => (
          <div
            key={problem.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '16px',
              fontFamily: 'monospace'
            }}
          >
            <span>{problem.first}</span>
            <span style={{ margin: '0 4px' }}>{problem.operator}</span>
            <span>{problem.second}</span>
            <span style={{ margin: '0 4px' }}>=</span>
            <span style={{
              display: 'inline-block',
              borderBottom: '1px solid #333',
              width: '30px',
              height: '20px'
            }}></span>
          </div>
        ))}
      </div>
    </div>
  );
};