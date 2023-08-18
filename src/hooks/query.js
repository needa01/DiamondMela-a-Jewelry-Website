import {
    useNavigate
} from "react-router-dom";


const useQueryHandler = (filter, id) => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);


    console.log("query", queryParams.toString());
    queryParams.delete("id");
    
    for (let key in filter) {
        console.log("key",key);
        queryParams.delete({key});
    }

    const newSearch = queryParams.toString();
    const newUrl = `${window.location.pathname}${
      newSearch ? `?${newSearch}` : ""
    }`;

    navigate(newUrl, {
        replace: true
    });

    // Adding the filter to the URL
    const currentSearch = window.location.search;
    const separator = currentSearch.length > 0 ? "&" : "?";
    const newPathname = "";
    let newFilterUrl = `${newPathname}${currentSearch}${separator}id=${id}`

    for (let prop in filter) {
        if (filter[prop] !== "") {
            newFilterUrl += `&${prop}=${filter[prop]}`;
        }
    }

    navigate(newFilterUrl);
};
export default useQueryHandler;