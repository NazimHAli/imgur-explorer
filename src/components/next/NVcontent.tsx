import * as React from "react";

const BaseCard = React.lazy(() => import("../BaseCard"));

let imgObserver;
import("../../utils/visibilityUtils").then((mod) => {
  imgObserver = new mod.ObserveElementsInView();
});

const useFetch = (searchQuery = "meow", pageNumber = 1, newSearch = false) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async function () {
      try {
        setLoading(true);
        import("../../services/imgurAPI").then(async (mod) => {
          const imgurClient = mod.ImgurAPI.getInstance();

          await imgurClient
            .submitGallerySearch(searchQuery, pageNumber, false)
            .then((response) => {
              setData(newSearch ? response : data.concat(response));
            });
        });
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery]);
  return { loading, data };
};

export default function NVcontent() {
  const { loading, data } = useFetch("meow", 1, true);

  const itemLoaded = React.useRef(null);

  React.useEffect(() => {
    if (data && data.length > 0) {
      const elsToObserve = document.querySelectorAll(
        "img.lazy-img:not([style*='opacity: 100'])"
      );

      if (elsToObserve?.length) {
        imgObserver.observeElements(elsToObserve);
      }
    }
  }, [data]);

  const measuredRef = React.useCallback((node) => {
    if (node !== null && !node.style.opacity) {
        imgObserver.observeElements([node]);
    }
  }, []);

  const RenderItems = () => {
    return (
      <div>
        {Array.from(data).map((image: any, imgIdx) => (
          <BaseCard
            key={`${imgIdx}-${imgIdx}`}
            item={image}
            cRef={measuredRef}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      {loading && (
        <div>
          <span>Loading...</span>
        </div>
      )}
      {data?.length > 0 && <RenderItems />}
    </div>
  );
}
