import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const ManageBlog = () => {
  let history = useHistory();
  let { slug } = useParams();
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");
  const [article, setArticle] = useState({
    image: "",
    title: "",
    description: "",
    markdown: "",
  });

  useEffect(() => {
    if (slug) {
      getArticleBySlug(slug);
      setEditing(true);
    }
  }, [slug]);

  const getArticleBySlug = async (slug) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/post/${slug}`);
      setArticle(res.data);
      setId(res.data._id);
    } catch (err) {
      console.log({ error: err });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (sessionStorage.token) {
      if (editing) {
        try {
          axios.defaults.headers.common["Authorization"] = sessionStorage.token;
          await axios.put(`http://localhost:4000/api/update/${id}`, article);
          history.push(`/article/${slug}`);
        } catch (err) {
          console.log({ error: err });
        }
      } else {
        try {
          axios.defaults.headers.common["Authorization"] = sessionStorage.token;
          await axios.post("http://localhost:4000/api/new/post", article);
          history.push("/");
        } catch (err) {
          console.log({ error: err });
        }
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control mb-3"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        type="text"
        required
        placeholder="Image Url"
        name="image"
        value={article.image}
        onChange={handleInputChange}
      />
      <input
        className="form-control mb-3"
        type="text"
        required
        placeholder="Title"
        name="title"
        value={article.title}
        onChange={handleInputChange}
      />
      <input
        className="form-control mb-3"
        type="text"
        required
        placeholder="Description"
        name="description"
        value={article.description}
        onChange={handleInputChange}
      />
      <textarea
        className="form-control mb-3 h-50"
        required
        rows="15"
        placeholder="Enter Text here"
        name="markdown"
        value={article.markdown}
        onChange={handleInputChange}
      />
      <div className="d-flex justify-content-center">
        <button className="btn btn-danger m-2" onClick={() => history.goBack()}>
          Cancel
        </button>
        <button className="btn btn-primary m-2" type="submit">
          {editing ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ManageBlog;
