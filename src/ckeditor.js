import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting';
import ImageResizeButtons from '@ckeditor/ckeditor5-image/src/imageresize/imageresizebuttons';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import List from '@ckeditor/ckeditor5-list/src/list';
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import Font from '@ckeditor/ckeditor5-font/src/font';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import { StrapiUploadAdapter } from '@gtomato/ckeditor5-strapi-upload-plugin';
import { StrapiMediaLib } from './strapi-medialib-plugin';
import sanitizeHtml from 'sanitize-html';
import FullScreen from './fullscreen-plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/pencil.svg';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'; 

export default class ClassicEditor extends ClassicEditorBase { }

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Italic,
	Underline,
	Code,
	Strikethrough,
	BlockQuote,
	Heading,
	Image,
	ImageInsert,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageResize,
	ImageResizeEditing,
	ImageResizeButtons,
	Indent,
	Link,
	LinkImage,
	List,
	Markdown,
	Table,
	TableToolbar,
	TableProperties,
	TableCellProperties, 
	InsertToolTip,
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'fontFamily',
			'fontSize',
			'fontColor',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'code',
			'link',
			'bulletedList',
			'numberedList',
			'InsertToolTip',
			'specialCharacters',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'htmlEmbed',
			'codeBlock', 
			'InsertToolTip',
		],
		shouldNotGroupWhenFull: true
	},
	image: {
		styles: [
			'alignLeft',
			'alignCenter',
			'alignRight',
		],
		resizeOptions: [
			{
				name: 'resizeImage:original',
				value: null,
				icon: 'original'
			},
			{
				name: 'resizeImage:50',
				value: '50',
				icon: 'medium'
			},
			{
				name: 'resizeImage:75',
				value: '75',
				icon: 'large'
			}
		],
		toolbar: [
			'imageStyle:alignLeft',
			'imageStyle:alignCenter',
			'imageStyle:alignRight',
			'|',
			'imageTextAlternative',
			'|',
			'resizeImage:50',
			'resizeImage:75',
			'resizeImage:original',
			'|',
			'linkImage',
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableProperties',
			'tableCellProperties',
		]
	},
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
			{ model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
		]
	},
	htmlEmbed: {
		showPreviews: true
	},
	sanitizeHtml: (inputHtml) => {
		const outputHtml = inputHtml; //sanitizeHtml(inputHtml);
		return {
			html: outputHtml,
			hasChanged: true
		};
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en', 

};

class InsertToolTip extends Plugin {
    init() {
        const editor = this.editor;
        editor.ui.componentFactory.add( 'InsertToolTip', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Tooltip',
                icon: imageIcon,
                tooltip: true
            } );
            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                const inputTooltipText = prompt( 'ToolTip Text' );
                editor.model.change( writer => {
					const link = writer.createText(inputTooltipText, {
						linkHref: "#bayut-content-tooltip"
					});
                    // Insert the image in the current selection location.
                    editor.model.insertContent( link, editor.model.document.selection );
                } );
            } );

            return view;
        } ); 
    }
}