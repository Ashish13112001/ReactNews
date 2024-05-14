import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=> {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const [articles,setArticles] = useState([]) 
    const [loading,setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [totalResults,setTotalResult]  = useState(0)
    
        

    const updateNews = async() => {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);
        setArticles(parsedData.articles)
        setTotalResult(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
    },[])


    const handlePrevClick = async () => {
        setPage(page-1)
        updateNews();
    }
    const handleNextClick = async () => {
        setPage(page+1)
        updateNews();
    }

    const fetchMoreData = async () => {
        setPage(page+1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        
        // now we use fetch API
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResult(parsedData.totalResults)
    };

        return (
            <>
                {loading && <Spinner/>} 
                
                <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <div className='row'>
                            {articles.map((element) => {
                                return <div className='col-md-4' key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>


            </>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News