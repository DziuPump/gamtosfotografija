import React, { useState, useEffect, useRef } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import styles from "./AdminPanel.module.css";

const customStyles = {
  content: {
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const customblogStyles = {
  content: {
    background: "white",
    width: "60%",
    maxWidth: "calc(100vw - 2rem)",
    maxHeight: "calc(100vh - 2rem)",
    boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.25)",
    overflowY: "auto",
    position: "relative",
    marginBottom: "50px",
    minHeight: "600px",
  },
  overlay: {
    position: "fixed",
    zIndex: "999999",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default function AdminPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [albumName, setAlbumName] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");

  const [newAlbumSuccess, setNewAlbumSuccess] = useState(false);
  const [deleteAlbumSuccess, setDeleteAlbumSuccess] = useState(false);

  const [editAlbumSuccess, setEditAlbumSuccess] = useState(false);

  const [selectedEditAlbum, setSelectedEditAlbum] = useState(null);

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isBlogEditModalOpen, setIsBlogEditModalOpen] = useState(false);

  const [blogName, setBlogName] = useState("");
  const [blogSubject, setBlogSubject] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogThumbnail, setBlogThumbnail] = useState(null);
  const [blogEditorState, setBlogEditorState] = useState(
    EditorState.createEmpty()
  );
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [blogDeleteModalOpen, setIsBlogDeleteModalOpen] = useState(false);

  const handleBlogSubmit = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", blogName);
    formData.append("subject", blogSubject);
    formData.append("description", blogDescription);
    formData.append("thumbnail", blogThumbnail);
    formData.append(
      "content",
      JSON.stringify(convertToRaw(blogEditorState.getCurrentContent()))
    );

    axios
      .post("https://api.gamtosfotografija.lt/api/blog", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Blog saved successfully!");
        setBlogName("");
        setBlogSubject("");
        setBlogDescription("");
        setBlogThumbnail(null);
        setBlogEditorState(EditorState.createEmpty());
        window.location.href = "/administravimas";
      })
      .catch((error) => {
        console.error("Failed to save blog:", error);
      });
  };

  const handleEditBlog = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("newName", blogName);
    formData.append("subject", blogSubject);
    formData.append("description", blogDescription);
    formData.append(
      "content",
      JSON.stringify(convertToRaw(blogEditorState.getCurrentContent()))
    );

    try {
      const response = await axios.put(
        `https://api.gamtosfotografija.lt/api/blog/${selectedBlog.id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogName("");
      setBlogSubject("");
      setBlogDescription("");
      setBlogThumbnail(null);
      setBlogEditorState(EditorState.createEmpty());
      window.location.href = "/administravimas";
    } catch (error) {
      console.error("Failed to edit blog post:", error);
    }
  };

  const toolbarOptions = {
    options: [
      "inline",
      "blockType",
      "fontSize",
      "fontFamily",
      "list",
      "textAlign",
      "colorPicker",
      "link",
      "embedded",
      "emoji",
      "image",
      "remove",
      "history",
    ],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough", "monospace"],
    },
    blockType: {
      inDropdown: true,
      options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote"],
    },
    fontSize: {
      options: [8, 10, 12, 14, 16, 18, 24, 30, 36, 48],
    },
    fontFamily: {
      options: [
        "Arial",
        "Georgia",
        "Impact",
        "Tahoma",
        "Times New Roman",
        "Verdana",
      ],
    },
    textAlign: {
      inDropdown: true,
      options: ["left", "center", "right", "justify"],
    },
    list: {
      inDropdown: true,
      options: ["unordered", "ordered"],
    },
    link: {
      inDropdown: true,
    },
    history: {
      inDropdown: true,
    },
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setBlogThumbnail(file);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://api.gamtosfotografija.lt/api/albums"
        );
        const albums = response.data.map((album) => ({
          id: album.name,
          name: album.name,
          thumbnail: album.thumbnail,
          description: album.description,
        }));
        setAlbums(albums);
      } catch (error) {
        console.log("Error fetching albums:", error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://api.gamtosfotografija.lt/api/blog"
        );
        const blogs = response.data.map((blog) => ({
          id: blog.name,
          name: blog.name,
          subject: blog.subject,
          description: blog.description,
          content: blog.content,
        }));
        setBlogs(blogs);
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };

    fetchAlbums();
    fetchBlogs();
  }, []);

  useEffect(() => {
    ReactModal.setAppElement("#root");
  }, []);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (event.target.id === "thumbnail") {
      setSelectedThumbnail(files[0]);
    } else {
      setSelectedImages(files);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", albumName);
    formData.append("description", shortDescription);

    formData.append("thumbnail", selectedThumbnail);
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("images", selectedImages[i]);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api.gamtosfotografija.lt/api/newalbum",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Albumas sukurtas");
        setNewAlbumSuccess(true);
        setAlbumName("");
        setShortDescription("");
        setSelectedImages([]);
      } else {
        console.log("Nepavyko sukurti albumo");
        setNewAlbumSuccess(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedAlbum) {
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://api.gamtosfotografija.lt/api/albums`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            name: selectedAlbum,
          },
        }
      );

      if (response.status === 200) {
        console.log("Album deleted successfully");
        setDeleteAlbumSuccess(true);
      } else {
        console.log("Error deleting album");
        setDeleteAlbumSuccess(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const token = localStorage.getItem("token");
    formData.append("name", selectedEditAlbum.name);
    formData.append("description", selectedEditAlbum.description);

    try {
      await axios.put(
        `https://api.gamtosfotografija.lt/api/albums/${selectedEditAlbum.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedAlbums = albums.map((album) => {
        if (album.name === selectedEditAlbum.name) {
          return {
            ...album,
            name: selectedEditAlbum.name,
            description: selectedEditAlbum.description,
          };
        }
        return album;
      });

      setAlbums(updatedAlbums);
      setEditAlbumSuccess(true);
    } catch (error) {
      console.log("Error updating album:", error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://api.gamtosfotografija.lt/api/blog/${selectedBlog.name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Blog post deleted successfully!");
      window.location.href = "/administravimas";
    } catch (error) {
      console.error("Failed to delete blog post:", error);
    }
  };

  const closeBlogEditModal = () => {
    setIsBlogEditModalOpen(false);
    setSelectedBlog(null);
    setBlogName("");
    setBlogSubject("");
    setBlogDescription("");
    setBlogEditorState(EditorState.createEmpty());
  };

  const closeBlogModal = () => {
    setIsBlogModalOpen(false);
    setSelectedBlog(null);
    setBlogName("");
    setBlogSubject("");
    setBlogDescription("");
    setBlogEditorState(EditorState.createEmpty());
  };

  const closeDeleteBlogModal = () => {
    setIsBlogDeleteModalOpen(false);
    setSelectedBlog(null);
    setBlogName("");
    setBlogSubject("");
    setBlogDescription("");
    setBlogEditorState(EditorState.createEmpty());
  };

  const handleBlogSelect = (event) => {
    const selectedBlogId = event.target.value;
    if (selectedBlogId === "") {
      setSelectedBlog(null);
      setBlogName("");
      setBlogSubject("");
      setBlogDescription("");
      setBlogEditorState(EditorState.createEmpty());
    } else {
      const blog = blogs.find((blog) => blog.id === selectedBlogId);
      setSelectedBlog(blog);
      setBlogName(blog.name);
      setBlogSubject(blog.subject);
      setBlogDescription(blog.description);

      const contentState = convertFromRaw(JSON.parse(blog.content));
      setBlogEditorState(EditorState.createWithContent(contentState));
    }
  };

  return (
    <div className={styles.adminPanelWrapper}>
      <div className={styles.adminPanelContainer}>
        <h1 className={styles.adminH1}>Administravimo skydelis</h1>
        <div className={styles.adminContent}>
          <div className={styles.category}>
            <div className={styles.categoryList}>
              <h2 className={styles.contentHeader}>Galerija</h2>
              <ul>
                <li onClick={() => setIsModalOpen(true)}>Kurti naują įrašą</li>
                <li onClick={() => setIsDeleteModalOpen(true)}>Trinti įrašą</li>
                <li onClick={() => setIsEditModalOpen(true)}>Keisti įrašą</li>
              </ul>
            </div>
          </div>
          <div className={styles.category}>
            <div className={styles.categoryList}>
              <h2 className={styles.contentHeader}>Tinklaraštis</h2>
              <ul>
                <li onClick={() => setIsBlogModalOpen(true)}>
                  Kurti naują įrašą
                </li>
                <li onClick={() => setIsBlogDeleteModalOpen(true)}>
                  Trinti įrašą
                </li>
                <li onClick={() => setIsBlogEditModalOpen(true)}>
                  Keisti įrašą
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setNewAlbumSuccess(false);
        }}
        contentLabel="Create Album Modal"
        style={customStyles}
        appElement={document.getElementById("root")}
      >
        <h3>Kurti naują įrašą</h3>
        <form className={styles.newEntryModal} onSubmit={handleSubmit}>
          <label htmlFor="albumName">Albumo pavadinimas:</label>
          <input
            type="text"
            id="albumName"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
          />

          <label htmlFor="shortDescription">Trumpas aprašymas:</label>
          <textarea
            id="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />

          <label htmlFor="thumbnail">Pasirinkti viršelio nuotrauką:</label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleImageChange}
          />

          <label htmlFor="images">Pasirinkti nuotraukas:</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />

          <button type="submit" className={styles.submitButton}>
            Sukurti
          </button>
          {newAlbumSuccess && (
            <p style={{ color: "green" }}>Albumas sukurtas sėkmingai</p>
          )}
        </form>
      </ReactModal>
      <ReactModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteAlbumSuccess(false);
        }}
        contentLabel="Delete Album Modal"
        style={customStyles}
        appElement={document.getElementById("root")}
      >
        <h3>Trinti įrašą</h3>
        <div className={styles.newEntryModal}>
          <p>Pasirinkite albumą, kurį norite ištrinti:</p>
          <select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
          >
            <option value="">Pasirinkite albumą</option>
            {albums.map((album, index) => (
              <option key={index} value={album.name}>
                {album.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleDelete}
            disabled={!selectedAlbum}
            className={styles.submitButton}
          >
            Ištrinti
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className={styles.submitButton}
          >
            Atšaukti
          </button>
          {deleteAlbumSuccess && (
            <p style={{ color: "green" }}>Albumas ištrintas sėkmingai</p>
          )}
        </div>
      </ReactModal>
      <ReactModal
        isOpen={isEditModalOpen}
        onRequestClose={() => {
          setIsEditModalOpen(false);
          setEditAlbumSuccess(false);
        }}
        contentLabel="Edit Album Modal"
        style={customStyles}
        appElement={document.getElementById("root")}
      >
        <h3>Keisti įrašą</h3>

        <div className={styles.newEntryModal}>
          <p>Pasirinkite albumą, kurį norite keisti:</p>
          <select
            value={selectedEditAlbum ? selectedEditAlbum.id : ""}
            onChange={(e) => {
              const albumName = e.target.value;
              const selectedAlbum = albums.find(
                (album) => album.id === albumName
              );
              setSelectedEditAlbum(selectedAlbum);
            }}
          >
            <option value="">Pasirinkite albumą</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.name}
              </option>
            ))}
          </select>
          {selectedEditAlbum && (
            <form className={styles.newEntryModal} onSubmit={handleEdit}>
              <label htmlFor="albumName">Albumo pavadinimas:</label>
              <input
                type="text"
                id="albumName"
                name="name"
                value={selectedEditAlbum ? selectedEditAlbum.name : ""}
                onChange={(e) =>
                  setSelectedEditAlbum({
                    ...selectedEditAlbum,
                    name: e.target.value,
                  })
                }
              />

              <label htmlFor="shortDescription">Trumpas aprašymas:</label>
              <textarea
                id="shortDescription"
                name="description"
                value={selectedEditAlbum ? selectedEditAlbum.description : ""}
                onChange={(e) =>
                  setSelectedEditAlbum({
                    ...selectedEditAlbum,
                    description: e.target.value,
                  })
                }
              />

              <button type="submit" className={styles.submitButton}>
                Išsaugoti
              </button>
              {editAlbumSuccess && (
                <p style={{ color: "green" }}>Albumas atnaujintas sėkmingai</p>
              )}
            </form>
          )}
        </div>
      </ReactModal>
      <ReactModal
        isOpen={isBlogModalOpen}
        onRequestClose={closeBlogModal}
        contentLabel="Create Blog Modal"
        style={customblogStyles}
        appElement={document.getElementById("root")}
        shouldCloseOnOverlayClick={false}
      >
        <h3>Kurti naują įrašą</h3>
        <h5>Langą uždaro ESC arba f5</h5>
        <br />
        <h5>Uždarius langą informacija nebus išsaugota</h5>
        <h6>Nuotraukų dydžius rašyti su % (pvz., 100%, 80%)</h6>

        <div className={styles.newEntryModal}>
          <div className={styles.blogInputField}>
            <label style={{ marginRight: "20px" }}>Įrašo pavadinimas:</label>
            <input
              type="text"
              value={blogName}
              onChange={(e) => setBlogName(e.target.value)}
            />
          </div>
          <div className={styles.blogInputField}>
            <label style={{ marginRight: "20px" }}>Tema:</label>
            <input
              type="text"
              value={blogSubject}
              onChange={(e) => setBlogSubject(e.target.value)}
            />
          </div>
          <div className={styles.blogInputField}>
            <label style={{ marginRight: "20px" }}>Nuotrauka:</label>
            <input type="file" onChange={handleThumbnailChange} />
          </div>
          <div className={styles.blogInputField}>
            <label style={{ marginRight: "20px" }}>Trumpas aprašymas:</label>
            <textarea
              style={{ width: "90%" }}
              value={blogDescription}
              onChange={(e) => setBlogDescription(e.target.value)}
            />
          </div>
          <Editor
            editorState={blogEditorState}
            onEditorStateChange={setBlogEditorState}
            toolbar={toolbarOptions}
          />
          <button onClick={handleBlogSubmit}>Sukurti</button>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={isBlogEditModalOpen}
        onRequestClose={closeBlogEditModal}
        contentLabel="Edit Blog Modal"
        style={customblogStyles}
        shouldCloseOnOverlayClick={false}
        appElement={document.getElementById("root")}
      >
        <h3>Keisti įrašą</h3>
        <h6>Langą uždaro ESC arba f5</h6>
        <br />
        <h6>Uždarius langą informacija nebus išsaugota</h6>
        <h6>Nuotraukų dydžius rašyti su % (pvz., 100%, 80%)</h6>

        <div className={styles.newEntryModal}>
          <div className={styles.blogInputField}>
            <label style={{ marginRight: "20px" }}>Pasirinkite įrašą:</label>
            <select onChange={handleBlogSelect} value={selectedBlog?.id}>
              <option value="">Select a blog</option>
              {blogs.map((blog) => (
                <option key={blog.id} value={blog.id}>
                  {blog.name}
                </option>
              ))}
            </select>
          </div>

          {selectedBlog && (
            <div className={styles.blogInputField}>
              <label style={{ marginRight: "20px" }}>Įrašo pavadinimas:</label>
              <input
                type="text"
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
              />
            </div>
          )}

          {selectedBlog && (
            <div className={styles.blogInputField}>
              <label style={{ marginRight: "20px" }}>Tema:</label>
              <input
                type="text"
                value={blogSubject}
                onChange={(e) => setBlogSubject(e.target.value)}
              />
            </div>
          )}

          {selectedBlog && (
            <div className={styles.blogInputField}>
              <label style={{ marginRight: "20px" }}>Aprašymas:</label>
              <textarea
                style={{ width: "90%" }}
                value={blogDescription}
                onChange={(e) => setBlogDescription(e.target.value)}
              />
            </div>
          )}

          {selectedBlog && (
            <div className={styles.blogInputField}>
              <label style={{ marginRight: "20px" }}>Turinys:</label>
              <Editor
                editorState={blogEditorState}
                onEditorStateChange={setBlogEditorState}
                toolbar={toolbarOptions}
              />
            </div>
          )}

          {selectedBlog && <button onClick={handleEditBlog}>Keisti</button>}
        </div>
      </ReactModal>
      <ReactModal
        isOpen={blogDeleteModalOpen}
        onRequestClose={closeDeleteBlogModal}
        contentLabel="Delete Blog Modal"
        style={customblogStyles}
        shouldCloseOnOverlayClick={true}
        appElement={document.getElementById("root")}
      >
        <h3>Ištrinti įrašą</h3>
        <h5>
          <u>Įrašas bus negrįžtamai ištrintas</u>
        </h5>

        <div className={styles.newEntryModal}>
          <div className={styles.blogInputField}>
            <label style={{ marginRight: "20px" }}>Pasirinkite įrašą:</label>
            <select onChange={handleBlogSelect} value={selectedBlog?.id}>
              <option value="">Select a blog</option>
              {blogs.map((blog) => (
                <option key={blog.id} value={blog.id}>
                  {blog.name}
                </option>
              ))}
            </select>
          </div>

          {selectedBlog && (
            <div>
              <h4>Ar tikrai norite ištrinti įrašą "{selectedBlog.name}"?</h4>
              <button onClick={handleDeleteBlog}>Ištrinti</button>
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  );
}
