import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
    const [imgData, setImgData] = useState([]);
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
    fetch('https://raw.githubusercontent.com/t233hao/daily-image/main/python/merge.txt')
        .then(response => response.text())
        .then(data => {
            const imgData = data.split('\n').filter(link => link.trim() !== '');
            setImgData(imgData);
            console.log(imgData);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/t233hao/daily-image/main/python/merge.json')
            .then(response => response.json())
            .then(jsonData => {
                setJsonData(jsonData);
                console.log(jsonData);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <p id='text'>每天一句中国古诗词，生成 AI 图片 Powered by Bing DALL-E-3.</p>
            <p id='label'>All Images</p>

            <div className='cardEnum'>
                {imgData.map((item, index) => (
                    <div key={index} className='card' style={{ 
                        backgroundImage: `url(${item})`, 
                        backgroundSize: '280px 280px',
                        backgroundRepeat: 'no-repeat'
                    }}>

                        <div className='jsonData'>
                            {jsonData[index] && <p id='content'>{jsonData[index].data.content}</p>}
                            {jsonData[index] && <p id='title'>{jsonData[index].data.origin.title}&nbsp;|&nbsp;{jsonData[index].data.origin.author}</p>}
                            {jsonData[index] && <p id='time'>{new Date(jsonData[index].data.cacheAt).toLocaleDateString()}</p>}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Home;