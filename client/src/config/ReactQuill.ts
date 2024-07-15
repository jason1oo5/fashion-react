
    /* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

    export const Editor: any = {};

    Editor.modules = {
        toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
        {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
        ],
        clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
        }
    }
    /* 
    * Quill editor formats
    * See https://quilljs.com/docs/formats/
    */
    Editor.formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];