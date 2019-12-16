## Yet Another Shopping List

Built using `create-react-app` with the help of `@atlaskit`, `styled-components`, `lodash`.

## Main features:
- Shopping list with unlimited numbers of items
- Each item has amount count, checkbox for marking done and remove button
- Data is storaged locally using localStorage and also Express server to save data to server. Data is saved to server when one of two events occure:
	User clicks `save this list button`  
	User closes the app's tab. In this case data is posted to server on the background using service worker.