Rest Api Framework with MongoDB NodeJS
============================
This Restful Api Framework is developed to perform the CRUD operation. This Framework is based on MV (Model - View) Structure.
 * MongoDB
 * NodeJS
 * Express

In this Framework there is One base model class which has all the needed function which is required to perform CRUD operation in Rest Api. The base class has the following functions list.
* `findAll` - to `get all the records` from current collections
* `get` - to `get a single record` based on `Id` from current collections
* `save` - to `insert` a record in current collections
* `update` - to `update` a record based from current collections
* `delete` - to `delete` a record based on `Id` from current collections

you can also create your own model in the `model` directory to override the base model function. If you want to override only one function from base class then you can just right one function in your new model other function will be taken from base class.

The routing structure is also simple. You dont have to declare the collection name in the file. You have to pass the collection name in the url. So the you can do CRUD operation on any collection. The sample of routing structure is :

``` http://localhost:8080/collection_name ```

##CRUD example actions (Assuming the collection name is `driver`)
### Global
* Set `Content-type:` to `application/json`

### Insert element (POST /driver)
    POST - http://localhost:8080/driver
    POST DATA - ```javascript {"name" : "Driver Name", "phone" : "9999999999" } ```
    
    Returns a JSON Object like this
    ```javascript
    {
        "name": "Driver Name",
        "phone": "9999999999",
        "created_at": "2014-06-23T10:09:48.581Z",
        "_id": "53a7fcecac23bcd417d44f6e"
    } ```

### Read all elements (GET /driver)
    GET - http://localhost:8080/driver
    
    Returns a JSON Object like this
    ```javascript
    [
        {
            "name": "Driver Name",
            "phone": "9999999999",
            "created_at": "2014-06-23T10:09:48.581Z",
            "_id": "53a7fcecac23bcd417d44f6e"
        },
        {
            "name": "Driver Name 1 ",
            "phone": "9999990000",
            "created_at": "2014-06-23T10:13:58.798Z",
            "_id": "53a7fde6ac23bcd417d44f6f"
        }
    ] ```

### Read element by _id (GET /driver/{_id})
    GET - http://localhost:8080/driver/53a7fcecac23bcd417d44f6e

    Returns a JSON Object like this
    ```javascript
    {
        "name": "Driver Name",
        "phone": "9999999999",
        "created_at": "2014-06-23T10:09:48.581Z",
        "_id": "53a7fcecac23bcd417d44f6e"
    } ```
     
### Update element (PUT /driver/{_id})
    PUT - http://localhost:8080/driver/53a7fcecac23bcd417d44f6e
    POST DATA - ```javascript {"name" : "Driver Name Changed", "phone" : "9999999999" } ```
    
    Returns a JSON Object like this
    ```javascript
    {
        "name": "Driver Name Changed",
        "phone": "9999999999",
        "updated_at": "2014-06-23T10:17:58.407Z"
    } ```

### Delete element (DELETE /driver/{_id})
    DELETE - http://localhost:8080/driver/53a7fcecac23bcd417d44f6e

If you want to create any new function or you want to override some functions from base class for driver collection then you have to create a `driver.js` in `model directory`.

This is a very first version so lots of modification need to do in this framework. Help me if you want to improve this framework

## History

### 1.0.0
* Initial release.

## License
The Rest-Api-with-MongoDB-NodeJS Application is released under the open source MIT.

## Author Info
* Name : [Pathik Gandhi](http://pathikgandhi.info) (http://pathikgandhi.info)
* Twitter : [gr8pathik](http://twitter.com/gr8pathik) (http://twitter.com/gr8pathik)
* Github : [gr8pathik](http://github.com/gr8pathik) (http://github.com/gr8pathik)