export class TemplateOptions {
	email: string;
	text: string;
	title: string;
	preheaderText: string;
	heroImage: string;
	footerText: string;
	brand: string;
	siteURL: string;
	bgcolor: string;
	brandColor: string;
	textColor: string;
	lightColor: string;
	type: string;

	constructor() {
		this.email = '';
		this.text = '';
		this.title = '';
		this.preheaderText = '';
		this.heroImage = `https://elliotreed.net/icons/icon-96x96.png`;
		this.footerText = '\u00A9 Elliot Reed';
		this.brand = 'elliotreed.net';
		this.siteURL = 'https://elliotreed.net';
		this.bgcolor = `#fdfdfd`;
		this.brandColor = `#2e3832`;
		this.textColor = `#382e31`;
		this.lightColor = `#e4ddcd`;
		this.type = '';
	}
}
