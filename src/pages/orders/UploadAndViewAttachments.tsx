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
          <p>
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
          </p>
        ) : (
          <p>No attachment</p>
        )}
      </>
    );
  };

  return (
    <>
      <Form.Group>
        <Form.File label="Upload Attachments" onChange={handleInputChange} />
      </Form.Group>
      {attachments ? (
        <div>
          <ul>
            {attachments.map((attachment) => {
              return (
                <li key={attachment.name}>
                  <AttachmentContainer attachment={attachment} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>No attachments for this order</p>
      )}
    </>
  );
};
