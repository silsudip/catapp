import { Button } from '@material-ui/core';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { setMessage, uploadImage } from '../redux/actions/cat';
import { IStore } from '../redux/stores/IStore';

const mapStateToProps = (store: IStore) => {
    return {
        isError: store.catState.isError,
        message: store.catState.message
    }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        uploadImage: (file: any) => dispatch(uploadImage(file)),
        setMessage: (isError: boolean, message: string) => dispatch(setMessage(isError, message))
    }
}
const connector = connect(mapStateToProps, mapDispatchToProps);

type UploadProps = ConnectedProps<typeof connector>;

const Upload: React.FC<UploadProps> = ({ isError, message, uploadImage, setMessage }) => {
    const [file, setFile] = useState<File>();

    const handleUpload = (ev: any) => {
        console.log('File uploaded', ev.target.files[0]);
        setFile(ev.target.files[0]);
    }
    const _uploadImage = (ev: any) => {
        if (file) {
            uploadImage(file);
        }
    }
    useEffect(() => {
        if (!isError && message != '') {
            setTimeout(() => {
                setMessage(false, '');
                window.location.href = '/#';
            }, 5000);
        }
    }, [isError, message]);
    return (<div>
        <h1>Upload file</h1>
        { message == '' ? null :
            isError ?
                <p className="ErrorMessage">{message}</p> :
                <p className="SuccessMessage">{message}</p>
        }
        <p>
            <input type="file" onChange={handleUpload} />
        </p>
        <p>
            <Button variant="outlined" color="primary" onClick={_uploadImage}>
                Add Image
        </Button>
        </p>
    </div>);
};

export default connector(Upload);