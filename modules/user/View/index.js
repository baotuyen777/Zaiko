import React, { Component } from 'react';

export default class View extends Component {
  render() {
    return (
      <div className="formView">
          <div className="panel panel-default">
            <div className="panel-heading clearfix">
                <div className="col-md-6 title">
                    <h3>User details</h3>
                </div>{/* end title*/}
                <div className="col-md-6 action text-right">
                    <button type="button" className="save">SAVE</button>
                    <button type="button" className="cancel">Cancel</button>
                </div>{/* end action*/}
            </div>
            <div className="panel-body">

                <div className="row">
                  <div className="col-md-12 profile">
                    <img src="http://i1.wp.com/teachyourself.vn/wp-content/uploads/2015/10/banner-accordion.jpg" className="img-responsive avatar" alt="user"/>
                  </div>
                  <div className="col-md-6">
                      <fieldset>
                        {/* Form Name */}
                        <legend>Address Details</legend>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Line 1</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Address Line 1" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Line 2</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Address Line 2" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">City</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="City" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">State</label>
                          <div className="col-sm-4">
                            <input type="text" placeholder="State" className="form-control" />
                          </div>
                          <label className="col-sm-2 control-label" htmlFor="textinput">Postcode</label>
                          <div className="col-sm-4">
                            <input type="text" placeholder="Post Code" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Country</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Country" className="form-control" />
                          </div>
                        </div>
                        
                      </fieldset>
                  </div>{/* /.col-md-6 */}
                  <div className="col-md-6">
                      <fieldset>
                        {/* Form Name */}
                        <legend>Address Details</legend>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Line 1</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Address Line 1" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Line 2</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Address Line 2" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">City</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="City" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">State</label>
                          <div className="col-sm-4">
                            <input type="text" placeholder="State" className="form-control" />
                          </div>
                          <label className="col-sm-2 control-label" htmlFor="textinput">Postcode</label>
                          <div className="col-sm-4">
                            <input type="text" placeholder="Post Code" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Country</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Country" className="form-control" />
                          </div>
                        </div>
                        
                      </fieldset>
                  </div>{/* /.col-md-6 */}
                </div>{/* /.row */}
                <br/><br/><br/>
                <div className="row">
                  <div className="col-md-6">
                      <fieldset>
                        {/* Form Name */}
                        <legend>Address Details</legend>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Line 1</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Address Line 1" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Line 2</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Address Line 2" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">City</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="City" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">State</label>
                          <div className="col-sm-4">
                            <input type="text" placeholder="State" className="form-control" />
                          </div>
                          <label className="col-sm-2 control-label" htmlFor="textinput">Postcode</label>
                          <div className="col-sm-4">
                            <input type="text" placeholder="Post Code" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Country</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Country" className="form-control" />
                          </div>
                        </div>
                        
                      </fieldset>
                  </div>{/* /.col-md-6 */}
                  <div className="col-md-6">
                      <fieldset>
                        {/* Form Name */}
                        <legend>Address Details</legend>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Line 1</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Address Line 1" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Line 2</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Address Line 2" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">City</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="City" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">State</label>
                          <div className="col-sm-4">
                            <input type="text" placeholder="State" className="form-control" />
                          </div>
                          <label className="col-sm-2 control-label" htmlFor="textinput">Postcode</label>
                          <div className="col-sm-4">
                            <input type="text" placeholder="Post Code" className="form-control" />
                          </div>
                        </div>
                        {/* Text input*/}
                        <div className="form-group">
                          <label className="col-sm-2 control-label" htmlFor="textinput">Country</label>
                          <div className="col-sm-10">
                            <input type="text" placeholder="Country" className="form-control" />
                          </div>
                        </div>
                        
                      </fieldset>
                  </div>{/* /.col-md-6 */}
                </div>{/* /.row */}
               
            </div>
          </div>
         
      </div>
    );
  }
}
