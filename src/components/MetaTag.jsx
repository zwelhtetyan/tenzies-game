import React from 'react';
import { MetaTags } from 'react-meta-tags';
import preview from '../preview.png';

export default function MetaTag() {
    return (
        <div className='wrapper'>
            <MetaTags>
                <meta property='og:title' content='Tenzies Game 🎲' />
                <meta property='og:image' content={preview} />
                <meta
                    property='og:url'
                    content='https://tenzies-game1.netlify.app'
                ></meta>
            </MetaTags>
        </div>
    );
}
