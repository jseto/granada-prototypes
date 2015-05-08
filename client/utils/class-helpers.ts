
module ClassHelpers {
	export class Singleton{
		constructor() {
			if ( Singleton._instance ) {
				throw ('Singleton class cannot be instatiated with new. Use NgModule.instance() instead');
			}
			Singleton._instance = this;
		}
		
		instance(){
			return Singleton._instance;
		}
		
		private static _instance: Singleton = new Singleton();
	};
}