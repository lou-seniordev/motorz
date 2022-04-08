import React, { Fragment, useEffect, useState } from "react";
import { Header, Grid, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import { useTranslation } from "react-i18next";
// import { RootStoreContext } from "../../stores/rootStore";

interface IProps {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}
const PhotoUploadWidget: React.FC<IProps> = ({ loading, uploadPhoto }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

  const { t } = useTranslation(["widget"]);


  // == this is to clean up the uploaded file from memory ==
  useEffect(() => {
 
      return () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <Fragment>
      <Grid>
     

        <Grid.Column 
        computer={4} mobile={16}
        // width={4}
        >
          <Header color='teal' sub content={t('Step 1 - Add Photo')} />
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column 
        computer={4} mobile={16}
        // width={4}
        >
          <Header sub color='teal' content={t('Step 2 - Resize image')} />
          {files.length > 0 && (
            <PhotoWidgetCropper
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
       
        <Grid.Column 
        computer={4} mobile={16}
        // width={4}
        >
          <Header sub color='teal' content={t('Step 3 - Preview & Upload')} />
          {files.length > 0 && (
            <Fragment>
              <div
                className='img-preview'
                style={{ minHeight: '200px', overflow: 'hidden' }}
              />
              <Button.Group widths={2}>
                <Button
                  positive
                  icon='check'
                  loading={loading}
                  onClick={() => uploadPhoto(image!)}
                />
                <Button 
                icon='close'
                disabled={loading}
                onClick={() => setFiles([])}
                />
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>       
      </Grid>
    </Fragment>
  );
};

export default observer(PhotoUploadWidget);
