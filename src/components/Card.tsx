function Card({ item, imgRef }) {
  return (
    <div className="card">
      <img src="" alt="" data-srcset={item?.images[0]?.link} ref={imgRef} />
      <span className="info">
        <h3>{item?.title}</h3>
        <p>User: {item?.account_url}</p>
        <p>Favourites: {item?.favorite_count}</p>
        <p>Comments: {item?.comment_count}</p>
        <p>
          Ups: {item?.ups} Downs: {item?.downs}
        </p>
      </span>
    </div>
  );
}

export default Card;
