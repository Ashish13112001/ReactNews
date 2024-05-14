import React from 'react'

const NewsItem = (props) => {
    
    
        let {title, description, imageUrl, newsUrl,author,date} = props;  //destructuring ki madat s jo bhi hmko props m s nikalna h nikal skte h
        return (
            // className='my-3'
            <div className='my-3'>
                <div className="card" >
                    {/* change */}
                    <img src={imageUrl?imageUrl:"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"} alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {date}</small></p>
                            {/* btn-sm */}
                            {/* video 28 rel="noreferrer" */}
                            <a  href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a> 
                        </div>
                </div>
            </div>
        );
}

export default NewsItem