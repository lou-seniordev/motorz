import React, { useContext, useEffect, useState } from "react"; //InputHTMLAttributes
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { MotofyFormValues } from "../../../app/models/motofy";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";


import { year } from "../../../app/common/options/yearOptions";
import { toast } from "react-toastify";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";

const ProductForm = () => {
    return (
        <div>
            <h1>HELLO IM product FORM!</h1>
        </div>
    )
}

export default ProductForm
