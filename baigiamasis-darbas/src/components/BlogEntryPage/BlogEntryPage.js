import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  EditorState,
  convertFromRaw,
  CompositeDecorator,
  Entity,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import styles from "./BlogEntryPage.module.css";
import { FooterContainer } from "../../containers/footer";

export default function BlogPage() {
  const { name } = useParams();
  const [content, setContent] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const ImageComponent = (props) => {
    const { src, alt } = Entity.get(props.entityKey).getData();

    const containerStyle = {
      maxWidth: "100%",
      height: "auto",
      width: "auto",
      margin: "0 auto",
    };

    const imageStyle = {
      display: "block",
      maxWidth: "100%",
      height: "auto",
      width: "auto",
    };

    return (
      <div style={containerStyle}>
        <img src={src} alt={alt} style={imageStyle} />
      </div>
    );
  };

  const findImageEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "IMAGE"
      );
    }, callback);
  };

  const imageDecorator = new CompositeDecorator([
    {
      strategy: findImageEntities,
      component: ImageComponent,
    },
  ]);

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        const response = await axios.get(
          `https://api.gamtosfotografija.lt/api/blog/${name}`
        );
        const { content } = response.data;
        setContent(content);
      } catch (error) {
        console.error("Failed to fetch blog content:", error);
      }
    };

    fetchBlogContent();
  }, [name]);

  useEffect(() => {
    if (content) {
      const parsedContentState = convertFromRaw(content);
      const initialEditorState = EditorState.createWithContent(
        parsedContentState,
        imageDecorator
      );
      setEditorState(initialEditorState);
    }
  }, [content]);

  return (
    <>
      <div className={styles.blogWrapper}>
        <div className={styles.blogContent}>
          {editorState.getCurrentContent() && (
            <Editor editorState={editorState} readOnly toolbarHidden />
          )}
        </div>
      </div>
      <FooterContainer />
    </>
  );
}
