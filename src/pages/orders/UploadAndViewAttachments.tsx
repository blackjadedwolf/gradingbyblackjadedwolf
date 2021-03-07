import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { EyeFill, EyeSlashFill, Trash } from "react-bootstrap-icons";
import { useDownloadURL } from "react-firebase-hooks/storage";
import {
  deleteAttachment,
  listOrderAttachments,
  setAttachmentViewability,
  uploadAttachment,
} from "services/api";

export const UploadAndViewAttachments = (props: {
  orderID: string;
  isAdmin: boolean;
}) => {
  const { orderID, isAdmin } = props;

  const [attachments, setAttachments] = useState<
    firebase.default.storage.Reference[]
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
    attachment: firebase.default.storage.Reference;
    isAdmin: boolean;
  }) => {
    const { attachment } = props;
    const [url] = useDownloadURL(attachment);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [isViewableByUser, setIsViewableByUser] = useState<boolean>();

    useEffect(() => {
      attachment.getMetadata().then((metadata) => {
        setIsViewableByUser(metadata.customMetadata.userViewable === "true")
      })
    }, [attachment])

    return isAdmin ? (
      <>
        <Modal show={showDeleteModal} onHide={() => {setShowDeleteModal(false)}}>
          <Modal.Header>
            <Modal.Title>Confirm your choice</Modal.Title>
          </Modal.Header>
          <Modal.Body>This will permanently delete the attachment!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteAttachment(attachment!);
                setShowDeleteModal(false);
                setRefreshFlag(!refreshFlag);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
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
          <Button
            onClick={() => {
              setAttachmentViewability(!isViewableByUser, attachment);
              setRefreshFlag(!refreshFlag);
            }}
          >
            {isViewableByUser ? <EyeFill /> : <EyeSlashFill />}
          </Button>
        </div>
      </>
    ) : (
      isViewableByUser ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {attachment ? (
            <a href={url} download>
              {attachment.name}
            </a>
          ) : (
            <p>No Attachment</p>
          )}
        </div>
      ): null
    ) ;
  };

  return (
    <>
      {isAdmin && (
        <Form.Group>
          <Button style={{ width: "12rem", height: "2.2rem" }}>
            <Form.Label style={{ marginTop: "0.3rem" }}>
              {" "}
              Upload Attachment{" "}
            </Form.Label>
          </Button>
          <Form.File onChange={handleInputChange} />
        </Form.Group>
      )}

      {attachments ? (
        <div className="attachment-module">
          {attachments.map((attachment) => {
            return (
              <div key={attachment.name} className="attachment-text">
                <AttachmentContainer
                  isAdmin={isAdmin}
                  attachment={attachment}
                />
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
