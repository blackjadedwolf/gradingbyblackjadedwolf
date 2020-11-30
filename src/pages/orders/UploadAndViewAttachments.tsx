import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useDownloadURL } from "react-firebase-hooks/storage";
import {
  deleteAttachment,
  listOrderAttachments,
  uploadAttachment,
} from "services/api";

export const UploadAndViewAttachments = (props: { orderID: string }) => {
  const { orderID } = props;

  const [attachments, setAttachments] = useState<
    firebase.storage.Reference[]
  >();

  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    listOrderAttachments(orderID).then((attachmentsList) => {
      setAttachments(attachmentsList.items);
    });
  }, [orderID, refreshFlag]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      uploadAttachment(orderID, event.target.files[0]).then(() => {
        setRefreshFlag(!refreshFlag);
      });
    }
  };

  const AttachmentContainer = (props: {
    attachment?: firebase.storage.Reference;
  }) => {
    const { attachment } = props;
    const [url] = useDownloadURL(attachment);
  
    const [showDeleteModal, setShowDeleteModal] = useState(false);
  
    return (
      <>
        {" "}
        <Modal show={showDeleteModal}>
          <Modal.Header>
            <Modal.Title>Confirm your choice</Modal.Title>
          </Modal.Header>
          <Modal.Body>This will permanently delete the attachment!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteAttachment(attachment!);
                setShowDeleteModal(false);
                setRefreshFlag(!refreshFlag)
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {attachment ? (
          <div style={{ display:"flex", alignItems:'center', justifyContent:'center', flexDirection:"column"}}>
            <a href={url} download>
              {attachment.name}
            </a>
            <Button
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              <Trash />
            </Button>
          </div>
        ) : (
          <p>No attachment</p>
        )}
      </>
    );
  };

  return (
    <>
      <Form.Group>
        <Button style={{width:"12rem", height:"2.2rem"}}>
          <Form.Label style={{marginTop:"0.3rem"}}> Upload Attachment </Form.Label>
        </Button>
        <Form.File onChange={handleInputChange} />
      </Form.Group>
      {attachments ? (
        <div className="attachment-module">
          {attachments.map((attachment) => {
            return (
              <div key={attachment.name} className="attachment-text">
                <AttachmentContainer attachment={attachment} />
              </div>
            );
          })}
        </div>
      ) : (
        <p>No attachments for this order</p>
      )}
    </>
  );
};
