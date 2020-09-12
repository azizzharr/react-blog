import React from 'react';
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const SetBlogRender = ({state, onSubmit, onChangeCKEditor, onChangeFile, onChangeInputs}) => {
    const {options} = state
    return (
        <div className='container jumbotron'>
            <div className="card col-8 offset-2">
                <article className="card-body">
                    <h4 className="card-title mb-4 mt-1">Set blog</h4>
                    {state.errors.detail && <div className="text-danger">
                        {state.errors.detail}
                    </div>}
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label>Title</label>
                            <input required={options.title['required']} onChange={onChangeInputs} name="title"
                                   value={state.data.title}
                                   className="form-control"
                                   placeholder="Title" maxLength={options.title['max_length']} type="text"/>
                            {state.errors.title && <div className="text-danger">
                                {state.errors.title[0]}
                            </div>}

                        </div>
                        <div className='form-group'>
                            <label>Тип</label>
                            <select value={state.data.type} onChange={onChangeInputs} name='type'
                                    required={options.type['max_length']}
                                    className='form-control'>
                                {options.type.choices.map(({value, display_name: displayName}) => {
                                    return <option key={value} value={value}>{displayName}</option>
                                })}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Тело</label>
                            <CKEditor
                                data={state.data.body}
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    const body = editor.getData();
                                    onChangeCKEditor({body})
                                }}
                            />
                            {state.errors.body && <div className="text-danger">
                                {state.errors.body[0]}
                            </div>}

                        </div>
                        <div className='form-group'>
                            <label>Сокращённое тело</label>
                            <CKEditor
                                data={state.data.short_body}
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    const short_body = editor.getData();
                                    onChangeCKEditor({short_body})
                                }}
                            />
                            {state.errors.short_body && <div className="text-danger">
                                {state.errors.short_body[0]}
                            </div>}

                        </div>
                        <div className="form-group">
                            <input required={options.image['required']} onChange={onChangeFile} name="image"
                                   type="file"/>
                            {state.errors.image && <div className="text-danger">
                                {state.errors.image[0]}
                            </div>}

                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Сохранить</button>
                        </div>
                    </form>
                </article>
            </div>
        </div>
    )
}

export default SetBlogRender;
