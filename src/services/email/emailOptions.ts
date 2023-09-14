export class EmailOptions {
	from: string;
	to: string;
	subject: string;
	text: string;
	html: string;

	constructor(email: string) {
		this.from = '"elliotreed.net" <server@elliotreed.net>';
		this.to = email;
		this.subject = '';
		this.text = '';
		this.html = '';
	}
}
