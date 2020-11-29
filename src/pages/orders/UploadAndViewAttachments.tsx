import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { listOrderAttachments, uploadAttachment } from "services/api";

export const UploadAndViewAttachments = (props: {
  orderID: string;
}) => {
  const { orderID } = props;

  const [attachments, setAttachments] = useState<
    firebase.storage.Reference[]
  >();

  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    listOrderAttachments(orderID).then((attachmentsList) => {
      console.log("attachmentsList: ", attachmentsList);
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

const AttachmentContainer = (props: {
  attachment?: firebase.storage.Reference;
}) => {
  const { attachment } = props;
  const [url] = useDownloadURL(attachment);

  return attachment ? (
    <a href={url} download>{attachment.name}</a>
  ) : (
    <p>No attachment</p>
  );
};
