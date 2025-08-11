import React from 'react';
import { ContentData } from '../../types/content';
import '../../styles/print.css';

interface PrintLayoutProps {
  pages: ContentData[][];
  renderContent: (content: ContentData) => React.ReactElement;
}

export const PrintLayout: React.FC<PrintLayoutProps> = ({ pages, renderContent }) => {
  return (
    <div className="print-preview">
      {pages.map((pageContents, pageIndex) => (
        <div key={pageIndex} className="print-page">
          <div className="print-grid">
            {pageContents.map((content, contentIndex) => (
              <div key={`${pageIndex}-${contentIndex}`} className="print-item">
                {renderContent(content)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};