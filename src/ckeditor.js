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
		const outputHtml = sanitizeHtml(inputHtml);
		return {
			html: outputHtml,
			hasChanged: true
		};
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};

// This SVG file import will be handled by webpack's raw-text loader.
// This means that imageIcon will hold the source SVG.
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';

class InsertToolTip extends Plugin {
    init() {
        const editor = this.editor;
		// editor.model.schema.register('link', {
        //     inheritAllFrom: '$block',
        //     allowAttributes: ['id', 'title'],
        //     isBlock: true,
        // });

		editor.model.schema.register( 'a', {
			// Cannot be split or left by the caret.
			isLimit: true,

			//allowIn: 'simpleBox',

			// Allow content which is allowed in the root (e.g. paragraphs).
			allowContentOf: '$root'
		} );
		// editor.conversion.elementToElement({model: 'link', view: 'a'});
		// editor.conversion.attributeToAttribute({model: 'title', view: 'title'});
		// editor.conversion.attributeToAttribute({model: {name: 'link', key: 'id'}, view: 'id'});

		// const linkClasses = editor.config.get('link.options.classes')
		// const defaultLinkClass = editor.config.get('link.options.defaultClass')

		// editor.model.schema.extend('$text', { allowAttributes: 'linkClass' })

		// editor.conversion.for('downcast').attributeToElement({
		// model: 'linkClass',
		// view: (attributeValue, writer) => writer.createAttributeElement('a', { class: attributeValue }, { priority: 5 }),
		// converterPriority: 'low'
		// })

		// editor.conversion.for('upcast').attributeToAttribute({
		// view: {
		// 	name: 'a',
		// 	key: 'class'
		// },
		// model: 'linkClass',
		// converterPriority: 'low'
		// })
		// editor.conversion.for('upcast').attributeToAttribute({
		// 	view: {
		// 	  name: 'a',
		// 	  key: 'class'
		// 	},
		// 	model: {
		// 	  key: 'linkClass',
		// 	  value: viewElement => {
		// 		if(1) {
		// 		  return viewElement.getAttribute('class')
		// 		} else {
		// 		  return this.defaultClass
		// 		}
		// 	  }
		// 	},
		// 	converterPriority: 'low'
		//   })


		// editor.conversion.for( 'downcast' ).add( downcastAttributeToAttribute( {
		// 	model: 'test',
		// 	view: 'test'
		// } ) );


        editor.ui.componentFactory.add( 'InsertToolTip', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Tooltip',
                icon: imageIcon,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                const imageUrl = prompt( 'ToolTip Text' );

				 
                editor.model.change( writer => {
					// const link = writer.createElement('a', {
					// 	href: '', 
					// 	title: imageUrl
					// });
					//  writer.appendText('i', link);

					// const link = writer.createElement(  'p', null, [ 'foo', writer.createElement( 'img' ) ] ); 
					// const link = writer.createAttributeElement( 'strong' );
					// writer.createAttributeElement( 'strong', { 'alignment': 'center' } );
					
					// Make `<a>` element contain other attributes element so the `<a>` element is not broken.
					// const link = writer.createAttributeElement( 'a', { href: 'foo.bar' }, { priority: 5 } );
					
					// // Set `id` of a marker element so it is not joined or merged with "normal" elements.
					// writer.createAttributeElement( 'span', { class: 'myMarker' }, { id: 'marker:my' } );
                    const link = writer.createElement( 'image', {
						src: "i",
						alt: imageUrl,
						'data-mthml': "data.detail.latexFrmla",
					} );
					// const link = writer.createText('i', {
					// 	linkHref: 'https://file_link',
					// 	linkTitle: imageUrl,
					// 		title: imageUrl,
					// 		'title': imageUrl,
					// 		id: "anchor-abc",
					// 		linkClass: "aaaa",
					// 		'linkClass': "bbbb",
						
					//   });
					//   console.log("before", link._attrs);
					  //link._attrs[0].push("title", "adil amanat")
					//   writer.setAttribute( 'class', imageUrl, link );
				// 	const link = writer.createElement(`
				// 	<p>&nbsp;</p>
				// 	<a
				// 	href="${imageUrl}"
				// 	data-fancybox="group"
				// 	>
				// 		i
				// 	</a>
				// 	<h3 class="text-center">${imageUrl}</h3>
				// 	<p>&nbsp;</p>
				// `);

					// const root = editor.model.document.getRoot();
					// const p = writer.createElement( 'paragraph' );
					// const link = writer.createText( 'FooBar', /*{ 'test': 3 }*/ );

					// writer.setAttribute( 'test', 3, p );
					// writer.insert( link, p );

				
					console.log("abccccc", link._attrs);
					console.log("abc: ", link, "selection: ",editor.model.document.selection);
                    // Insert the image in the current selection location.
                    editor.model.insertContent( link, editor.model.document.selection );
                } );
            } );

            return view;
        } );

		// <simpleBoxDescription> converters
        editor.conversion.for( 'upcast' ).elementToElement( {
            model: 'a',
            view: {
                name: 'a',
                title: 'tooltip-box-description'
            }
        } );
        editor.conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'a',
            view: {
                name: 'a',
                title: 'tooltip-box-description'
            }
        } );
        editor.conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'a',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const a = viewWriter.createEditableElement( 'a', { title: 'tooltip-box-description' } );

                return toWidgetEditable( a, viewWriter );
            }
        } );
    }
}

// import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
// import Widget from '@ckeditor/ckeditor5-widget/src/widget';
// import Command from '@ckeditor/ckeditor5-core/src/command';
// import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

// class SimpleBox extends Plugin {
//     static get requires() {
//         return [ SimpleBoxEditing, SimpleBoxUI ];
//     }
// }

// class SimpleBoxUI extends Plugin {
//     init() {
//         console.log( 'SimpleBoxUI#init() got called' );

//         const editor = this.editor;
//         const t = editor.t;

//         // The "simpleBox" button must be registered among the UI components of the editor
//         // to be displayed in the toolbar.
//         editor.ui.componentFactory.add( 'simpleBox', locale => {
//             // The state of the button will be bound to the widget command.
//             const command = editor.commands.get( 'insertSimpleBox' );

//             // The button will be an instance of ButtonView.
//             const buttonView = new ButtonView( locale );

//             buttonView.set( {
//                 // The t() function helps localize the editor. All strings enclosed in t() can be
//                 // translated and change when the language of the editor changes.
//                 label: t( 'ToolTip' ),
//                 withText: true,
//                 tooltip: true
//             } );

//             // Bind the state of the button to the command.
//             buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

//             // Execute the command when the button is clicked (executed).
//             this.listenTo( buttonView, 'execute', () => editor.execute( 'insertSimpleBox' ) );

//             return buttonView;
//         } );
//     }
// }

// class SimpleBoxEditing extends Plugin {
//     static get requires() {
//         return [ Widget ];
//     }

//     init() {
//         console.log( 'SimpleBoxEditing#init() got called' );

//         this._defineSchema();
//         this._defineConverters();

//         this.editor.commands.add( 'insertSimpleBox', new InsertSimpleBoxCommand( this.editor ) );
//     }

//     _defineSchema() {
//         const schema = this.editor.model.schema;

//         schema.register( 'simpleBox', {
//             // Behaves like a self-contained object (e.g. an image).
//             isObject: true,

//             // Allow in places where other blocks are allowed (e.g. directly in the root).
//             allowWhere: '$block'
//         } ); 

//         schema.register( 'simpleBoxDescription', {
//             // Cannot be split or left by the caret.
//             isLimit: true,

//             allowIn: 'simpleBox',

//             // Allow content which is allowed in the root (e.g. paragraphs).
//             allowContentOf: '$root'
//         } );

//         schema.addChildCheck( ( context, childDefinition ) => {
//             if ( context.endsWith( 'simpleBoxDescription' ) && childDefinition.name == 'simpleBox' ) {
//                 return false;
//             }
//         } );
//     }

	
//     _defineConverters() {
		
//         const conversion = this.editor.conversion;
// 		const tooltip_text = prompt( 'ToolTip Text' );
//         // <simpleBox> converters
//         conversion.for( 'upcast' ).elementToElement( {
//             model: 'simpleBox',
//             view: {
//                 name: 'p',
//                 classes: 'tooltip-box'
//             }
//         } );
//         conversion.for( 'dataDowncast' ).elementToElement( {
//             model: 'simpleBox',
//             view: {
//                 name: 'p',
//                 classes: 'tooltip-box'
//             }
//         } );
//         conversion.for( 'editingDowncast' ).elementToElement( {
//             model: 'simpleBox',
//             view: ( modelElement, { writer: viewWriter } ) => {
//                 const p = viewWriter.createContainerElement( 'p', { class: 'tooltip-box' } );

//                 return toWidget( p, viewWriter, { label: 'simple box widget' } );
//             }
//         } ); 
//         // <simpleBoxDescription> converters
//         conversion.for( 'upcast' ).elementToElement( {
//             model: 'simpleBoxDescription',
//             view: {
//                 name: 'a',
//                 title: "tooltip_text"
//             }
//         } );
//         conversion.for( 'dataDowncast' ).elementToElement( {
//             model: 'simpleBoxDescription',
//             view: {
//                 name: 'a',
//                 title: "tooltip_text111"
//             }
//         } );
//         conversion.for( 'editingDowncast' ).elementToElement( {
//             model: 'simpleBoxDescription',
//             view: ( modelElement, { writer: viewWriter } ) => {
//                 // Note: You use a more specialized createEditableElement() method here.
//                 const a = viewWriter.createEditableElement( 'a', { title: tooltip_text } );

//                 return toWidgetEditable( a, viewWriter );
//             }
//         } );
//     }
// }

// class InsertSimpleBoxCommand extends Command {
//     execute() {
//         this.editor.model.change( writer => {
//             // Insert <simpleBox>*</simpleBox> at the current selection position
//             // in a way that will result in creating a valid model structure.
//             this.editor.model.insertContent( createSimpleBox( writer ) );
//         } );
//     }

//     refresh() {
//         const model = this.editor.model;
//         const selection = model.document.selection;
//         const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'simpleBox' );

//         this.isEnabled = allowedIn !== null;
//     }
// }

// function createSimpleBox( writer ) {
//     const simpleBox = writer.createElement( 'simpleBox' ); 
//     const simpleBoxDescription = writer.createElement( 'simpleBoxDescription' ); 
//     writer.append( simpleBoxDescription, simpleBox ); 

//     return simpleBox;
// }