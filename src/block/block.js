/**
 * BLOCK: custom-image-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import './style.js';


const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { PanelBody, Button, ResponsiveWrapper } = wp.components;
const { Fragment } = wp.element;
const { withSelect } = wp.data;
const { __ } = wp.i18n;
 
const BlockEdit = (props) => {
	const { attributes, setAttributes } = props;
 
	const removeMedia = () => {
		props.setAttributes({
			mediaId: 0,
			mediaUrl: '',
			mediaId2: 0,
			mediaUrl2: ''
			
		});
	}
 
 	const onSelectMedia = (media) => {
		props.setAttributes({
			mediaId: media.id,
			mediaUrl: media.url
		});
	}
	const onSelectMedia2 = (media2) => {
		props.setAttributes({
			mediaId2: media2.id,
			mediaUrl2: media2.url
		});
	}
 
	const blockStyle = {
		backgroundImage: attributes.mediaUrl2 != '' ? 'url("' + attributes.mediaUrl2 + '")' : 'none'
	};
	
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('Select block  image', 'webtop')}
					initialOpen={ true }
				>
					<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
								value={attributes.mediaId}
								allowedTypes={ ['image'] }
								render={({open}) => (
									<Button 
										className={attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
										onClick={open}
									>
										{attributes.mediaId == 0 && __('Choose an image', 'webtop')}
										{props.media != undefined && 
						            			<ResponsiveWrapper
									    		naturalWidth={ props.media.media_details.width }
											naturalHeight={ props.media.media_details.height }
									    	>
									    		<img src={props.media.source_url} />
									    	</ResponsiveWrapper>
						            		}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{attributes.mediaId != 0 && 
							<MediaUploadCheck>
								<MediaUpload
									title={__('Replace image', 'webtop')}
									value={attributes.mediaId}
									onSelect={onSelectMedia}
									allowedTypes={['image']}
									render={({open}) => (
										<Button onClick={open} isDefault isLarge>{__('Replace image', 'webtop')}</Button>
									)}
								/>
							</MediaUploadCheck>
						}
						{attributes.mediaId != 0 && 
							<MediaUploadCheck>
								<Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'webtop')}</Button>
							</MediaUploadCheck>
						}
					</div>
				</PanelBody>
				<PanelBody
					title={__('Select block background image', 'webtop')}
					initialOpen={ true }
				>
					<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia2}
								value={attributes.mediaId2}
								allowedTypes={ ['image'] }
								render={({open}) => (
									<Button 
										className={attributes.mediaId2 == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
										onClick={open}
									>
										{attributes.mediaId2 == 0 && __('Choose an image', 'webtop')}
										{props.media != undefined && 
						            			<ResponsiveWrapper
									    		naturalWidth={ props.media.media_details.width }
											naturalHeight={ props.media.media_details.height }
									    	>
									    		<img src={props.media.source_url} />
									    	</ResponsiveWrapper>
						            		}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{attributes.mediaId2 != 0 && 
							<MediaUploadCheck>
								<MediaUpload
									title={__('Replace image', 'webtop')}
									value={attributes.mediaId2}
									onSelect={onSelectMedia2}
									allowedTypes={['image']}
									render={({open}) => (
										<Button onClick={open} isDefault isLarge>{__('Replace image', 'webtop')}</Button>
									)}
								/>
							</MediaUploadCheck>
						}
						{attributes.mediaId2 != 0 && 
							<MediaUploadCheck>
								<Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'webtop')}</Button>
							</MediaUploadCheck>
						}
					</div>
				</PanelBody>
			</InspectorControls>
			<div className="comparison-slider-container">
				<img src={attributes.mediaUrl} className="comparison-slide-before"></img>
				<div className="comparison-slide-after" style={blockStyle}></div>
			</div>
		</Fragment>
	);
};
 
 
registerBlockType('webtop/imageselectinspector', {
	title: 'Custom Imageselect',
	icon: 'smiley',
	category: 'layout',
	supports: {
		align: true
	},
	attributes: {
		mediaId: {
			type: 'number',
			default: 0
		},
		mediaUrl: {
			type: 'string',
			default: ''
		},
		mediaId2: {
			type: 'number',
			default: 0
		},
		mediaUrl2: {
			type: 'string',
			default: ''
		}
	}, 
	edit: withSelect((select, props) => {
		
		const blockeditStyle = {
			media: props.attributes.mediaId ? select('core').getMedia(props.attributes.mediaId) : undefined 
		

		};
		return (
			<div className="custom-img" style={blockeditStyle}>
				
			</div>
		);

	
	})(BlockEdit),
	save: (props) => {
		const { attributes } = props;
		const blockStyle = {

			backgroundImage: attributes.mediaUrl2 != '' ? 'url("' + attributes.mediaUrl2 + '")' : 'none'
		

		};
		return (
<div className="comparison-slider-container">
  <img src={attributes.mediaUrl} className="comparison-slide-before"></img>
  <div className="comparison-slide-after" style={blockStyle}></div>
</div>
		);
	}
});