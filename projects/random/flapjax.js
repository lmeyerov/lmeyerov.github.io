/*
Copyright (c) 2006, the Flapjax Team All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

  * Redistributions of source code must retain the above copyright notice,
    this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.
  * Neither the name of the Brown University, the Flapjax Team, nor the names
    of its contributors may be used to endorse or promote products derived
    from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

//flapjaxInit: [Boolean [, Boolean]] -> {...}
//makeTopLevel defaults to true (all function names are in returned object instead of toplevel)
//explicitContext defaults to false for public functions (pass Maybes around or not)
//   (always explicit within library)
function flapjaxInit(makeTopLevel, explicitContext) {

    //compress via http://alex.dojotoolkit.org/shrinksafe/
    //make sure to change final eval call to use exported library renamed name

    var flapjax = {     

        version: 3, 
        
        makeTopLevel: makeTopLevel,
        explicitContext: explicitContext,

        lib: {}, //map, filter, member etc
        xlib: {}, //cited code from public domain
        base: {}, //paths, pulses
        engine: {}, //core nodes
        combinators: {}, // combinators yielding nodes
        behaviours: {}, // behaviours, combinators yielding behaviours
        dom: {}, // dom convenience methods and combinators
        anim: {}, // animation convenience methods and combinators
        ajax: {}, // ajax convenience methods and combinators
        nompiler: {}, //combinators for use by the compiler
        annotations: {}, //helpers for processing function annotations      
        pub: {}
        
    };

    //namespace shortcuts
    var l = flapjax.lib;
    var x = flapjax.xlib;
    var e = flapjax.engine;
    var b = flapjax.base;
    var c = flapjax.combinators;
    var be = flapjax.behaviours;
    var d = flapjax.dom;
    var anim = flapjax.anim;
    var compiler = flapjax.compiler;
    var a = flapjax.ajax;


    //==========FLASH COMPATIBILITY [global set by calling class ]
    if (!setTimeout) { 
        setTimeout = setTimeoutFun;
        clearTimeout = clearTimeoutFun;
    }
    //=====================================================

    /*
    Object (
        [np: Boolean] - not public - do not add function to flapjax.pub, default false
        [b: Boolean] - behaviour - add function to behaviour prototype, default false
        [e: Boolean] - event - add function to event prototype, default false
        [c: Boolean] - context - first parameter to function is context, default false
        [a: Number] - argument - parameter position to replace with object when used in prototype, default: don't do it
        [ul: Boolean ] - unlifted - default false; set to true to make a function unlifted
    ) */
    var $___a =[];
    
    //$$___a: {[np: boolean] [b: boolean] [e: boolean] [c: boolean] [a: Number] } 
    //                  * String fnName * fn ->  
    var $$___a = function (props, n, fn) { $___a.push(arguments); };
    
    $$___a({}, '$___defs', $___a);

    $$___a({}, 'getFlapjaxObj', function () { return flapjax.pub; });

    //TODO: object literal syntax may not work on IE5 Mac
    // then again, Mac users know better.
    flapjax.xlib = {
        
        //credit 4umi
        //slice: Array a * Integer * Integer -> Array a
        slice: function (arr, start, stop) 
        {
             var i, len = arr.length, r = [];
             if( !stop ) { stop = len; }
             if( stop < 0 ) { stop = len + stop; }
             if( start < 0 ) { start = len - start; }
             if( stop < start ) { i = start; start = stop; stop = i; }
             for( i = 0; i < stop - start; i++ ) { r[i] = arr[start+i]; }
             return r;
        }

    };
    x = flapjax.xlib;
    for (var ij in flapjax.xlib) { $$___a({}, ij, flapjax.xlib[ij]); }


    // A hashtable that is keyed off anything
    x.Hashtable = function(){
        this._underlyingHash = {};
    };
    $$___a({}, 'Hashtable', x.Hashtable);


    //Object Hash Credit: Russell Tyndall's Tech Blog - The Shizzle Fa Rizzl
    //This function will get or set a value in the hashtable
    x.Hashtable.prototype.get = function( key, val ){
        var hash = this._underlyingHash;
        var stringKey = this._getHashKey( key );
        var item = hash[stringKey];
        if(item === null || item === undefined){
            hash[stringKey] = [{key:key, val:val}];
            return val;
        }
        else{
            for( var i=0 ; i < item.length ; i++ ){
                if( item[i].key == key ){
                    if(val !== null && val !== undefined){
                        item[i].val = val;
                    }
                    return item[i].val;
                }
            }
            //if we get here there wasnt anything in the array (item) for me
            item.push( {key: key, val:val} );
            return val;
        }
    };

    //Aliasing for those not in the know
    x.Hashtable.prototype.set = x.Hashtable.prototype.get;
    x.Hashtable.prototype.put = x.Hashtable.prototype.get;

    //Creates a Hashkey for entry into the hashtable
    // we probably want a better one of these but...
    x.Hashtable.prototype._getHashKey = function( key ){
        var stringKey;
        if( typeof(key) == 'object' ){
            if( key.getHashKey ){
                stringKey = key.getHashKey();
            }
            else if( key.hashKey ){
                stringKey = key.hashKey;
            }
            else if( key.constructor ){
                switch( key.constructor ){
                                case Array:
                case String:
                case Number:
                    stringKey = key.toString();
                    break;
                default:
                    stringKey = 'k:';
                    for(var item in key){
                        stringKey += item[0];
                    }
                    break;
                }
            }
            else{
                stringKey = key.toString();
            }
        }
        else{
            stringKey = key.toString();
        }
    };

    //Empties the hashtable
    x.Hashtable.clear = function(){ this._underlyingHash = {}; };

    //Removes an object from the hash
    x.Hashtable.prototype.remove = function( key ){
        var hash = this._underlyingHash;
        var stringKey = this._getHashKey( key );
        var item = hash[stringKey];
        if(item === null){
            return null;
        }
        else{
            var bit = false;
            var rtn; 
            for( var i=0 ; i < item.length ; i++ ){
                if( bit === false && item[i].key == key ){
                    bit = true;
                    rtn = item[i].val;
                }
                else if( bit === true ){
                    item [i-1] = item[i];
                }
            }
            item.slice(0, item.length-1);
                return rtn;
        }
    };

    flapjax.lib =    
    { 
    
        isEqual: function (a,b) {
            return (a == b) ||
                   ( (((typeof(a) == 'number') && isNaN(a)) || a == 'NaN') &&
                     (((typeof(b) == 'number') && isNaN(b)) || b == 'NaN') );
        },

        identity: function (x) { return x; },

        //member: a * Array b -> Boolean
        member: function(elt, lst)
        {
            for (var i = 0; i < lst.length; i++) { 
                if (l.isEqual(lst[i], elt)) {return true;} 
            }
            return false;
        },

        //map:
        //  ( (a_1 * ... * a_m) -> b) * (a_1 * ... * a_n)_1 
        //  * ... * (a_1 * ... * a_n)_m 
        //  -> 
        //  (b_1 * ... * b_n)
        map: function (fn) 
        {
            var arrays = flapjax.xlib.slice(arguments, 1);
            if (arrays.length === 0) { return []; }
            else {
                var res = [];
                for (var i = 0; i < arrays[0].length; i++)
                {
                    res.push([]);
                    for (var arr = 0; arr < arrays.length; arr++) {
                        res[i].push(arrays[arr][i]);
                    }
                    res[i] = fn.apply({}, res[i]);
                }
                return res;
            }
        },

        mapi: function (fn)
        {
            var arrays = flapjax.xlib.slice(arguments, 1);
            if (arrays.length === 0) { return []; }
            else {
                var res = [];
                for (var i = 0; i < arrays[0].length; i++)
                {
                    res.push([i]);
                    for (var arr = 0; arr < arrays.length; arr++) {
                        res[i].push(arrays[arr][i]);
                    }
                    res[i] = fn.apply({}, res[i]);
                }
                return res;
            }
        },
        
        //filter: (a -> Boolean) * Array a -> Array a
        filter: function (predFn, arr)
        {
            var res = [];
            for (var i = 0; i < arr.length; i++) { 
                if (predFn(arr[i])) { res.push(arr[i]); }
            }
            return res;
        },

        //filter: (a -> Void) * Array a -> void
        forEach: undefined,
    
        //fold: 
        //  ((a1 * ... * am  * b) -> b) 
        //  * b 
        //  * (a1...an)1 *... * (a1...an)m 
        //  -> b
        //fold over list(s), left to right
        fold: function(fn, init /* arrays */) 
        {
            var lists = flapjax.xlib.slice(arguments, 2);
            if (lists.length === 0) { return init; }
            else {
                var acc = init;
                for (var i = 0; i < lists[0].length; i++)
                {
                    var args = 
                        flapjax.lib.map( 
                            function (lst) { return lst[i];}, 
                            lists);
                    args.push(acc);
                    acc = fn.apply({}, args);
                }
                return acc;
            }
        },

        //foldR: 
        //  ((a1 * ... * am  * b) -> b) 
        //  * b 
        //  * (a1...an)1 *... * (a1...an)m 
        //  -> b
        //fold over list(s), right to left, fold more memory efficient (left to right)
        foldR: function (fn, init /* arrays */)
        {
            var lists = flapjax.xlib.slice(arguments, 2);
            if (lists.length === 0) { return init; }
            else {
                var acc = init;
                for (var i = lists[0].length - 1; i > -1; i--)
                {
                    var args = 
                        flapjax.lib.map( 
                            function (lst) { return lst[i];}, 
                            lists);
                    args.push(acc);
                    acc = fn.apply({}, args);
                }
                return acc;     
            }
        }
    };
    l = flapjax.lib;
    l.forEach = function () { l.map.apply({}, arguments); return;};

    for (var ii in flapjax.lib) { $$___a({}, ii, flapjax.lib[ii]); }

    flapjax.base = { };
    b = flapjax.base;

    b.Maybe = function () {};

    b.MaybeFull = function (val) {this.value = val; };
    b.MaybeFull.prototype = new b.Maybe();
    b.MaybeFull.constructor = b.MaybeFull;

    b.MaybeEmpty = function () {};
    b.MaybeEmpty.prototype = new b.Maybe();
    b.MaybeEmpty.constructor = b.MaybeEmpty;    
    b.maybeEmpty = b.mmt = new b.MaybeEmpty();   
 
    b.Path = function () {};
    
    b.PathEnd = function (){};
    b.PathEnd.prototype = new b.Path();
    b.PathEnd.constructor = b.PathEnd;

    //PathLink: any * Path
    //instanceof Path
    b.PathLink = function (towards, from) { 
        if ((towards === undefined) || (from === undefined)) {
        //  throw ('Bad pathlink: towards ' + towards + ', from: ' + from);
        }
        this.towards = towards;
        this.from = from;
        return true;
    };
    b.PathLink.prototype = new b.Path();
    b.PathLink.constructor = b.PathLink;
    
    //PathBranch: Path * Path
    //instanceof Path
    b.PathBranch = function (left, right) 
    {
        if (left === undefined || right === undefined) {
            throw ('Bad pathbranch: left: ' + left + ', right: ' + right);
        }
        this.left = left;
        this.right = right;
        return true;
    };
    b.PathBranch.prototype = new b.Path();
    b.PathBranch.constructor = b.PathBranch;

    //pathBranches: Path* -> PathBranch
    b.pathBranches = function ()
    {
        return flapjax.lib.fold(
            function(n, acc) {return new flapjax.base.PathBranch(n, acc);}, 
            new b.PathEnd(), 
            arguments
        );
    };
   
    // isCommonPath: Path *  Path -> Boolean
    // throws('isCommonPath: unexpected type')
    // check for redundancy on links. note: links only checks backwards
    // assumes no cycle, which makes sense for traces
    flapjax.base.isCommonPath = function (left,right) 
    {
        if ((left instanceof b.PathEnd) || (right instanceof b.PathEnd)) { 
            return false;
        } else if ((left instanceof b.PathLink) && (right instanceof b.PathLink)) {
           return ((left == right) ||
           (left.towards == right.towards) ||
           b.isCommonPath(left.from, right.from) ||
           b.isCommonPath(left, right.from));
        } else if ((left instanceof b.PathBranch) || (right instanceof b.PathBranch)) {
            return ((left == right)  || ( (!(left instanceof b.PathBranch))? 
                false : 
                b.isCommonPath(left.left, right) || b.isCommonPath(left.right, right)) ||
                    ( (!(right instanceof b.PathBranch))? 
                false : 
                 b.isCommonPath(left, right.left) || b.isCommonPath(left, right.right))); 
        } else { 
            throw 'isCommonPath: unexpected type'; 
        }
    };

    // isCyclePath: Path -> Boolean, throws('isCyclePath: unexpected type')
    // Returns whether a node appears repeatadly in a path
    // Paths are finite (traces), but path values may repeat
    flapjax.base.isCyclePath = function (p)
    {
        if (p instanceof b.PathEnd) {
            return false;
        } else if (p instanceof b.PathLink) {
            return (b.isCommonPath(p, p.from) || b.isCyclePath(p.from)); 
        } else if (p instanceof b.PathBranch) {
            return (    flapjax.base.isCommonPath(p, p.left) ||
                        flapjax.base.isCommonPath(p, p.right) ||
                        b.isCyclePath(p.left) || b.isCyclePath(p.right));
        } else { 
            throw 'isCyclePath: unexpected type'; 
        }
    };

    //Pulse: Stamp * Path * Obj
    flapjax.base.Pulse = function (stamp, path, value)
    {
        this.stamp = stamp;
        this.path = path;
        this.value = value;
    };

    //Probably can optimize as we expect increasing insert runs etc
    b.PQ = function () {
        var ctx = this;
        ctx.val = [];
        var sortFn = function (u, v) { 
                return u.k - v.k; 
            }; //lowest rank first

        var found = false;
        this.insert = function (kv) {
            ctx.val.push(kv);  
            ctx.val.sort(sortFn);
        }; //TODO unclear speed
        this.isEmpty = function () { 
            return ctx.val.length === 0; 
        };
        this.pop = function () { return ctx.val.splice(0, 1)[0]; };
    };

    var stackHeight = 0; //height of tree from pulse source to current node handler    
    var queue = new b.PQ(); //topological queue for current timestep
    var incomingQueue = []; //queue for events entering system (over multiple timesteps)
    
    //insert an event into the system at the next possible timestep
    //nodes would most likely be [receiver_e]
    b.injectEvent = function (val, nodes) {
    if ((stackHeight === 0) && (incomingQueue.length === 0)) {
        b.propagatePulse(new b.Pulse(e.nextStamp(), new b.PathEnd(), val), nodes);
    } else {
        incomingQueue.push([val,nodes]);    
    }
    };
    

    //propagatePulse: Pulse * Array Node -> 
    //Send the pulse to each node 
    flapjax.base.propagatePulse = function (pulse, nodes)
    {
        for (var i = 0; i < nodes.length; i++) 
        {
            stackHeight++;
            nodes[i].updater(
                (function(node){
                    return function (nextPulse) {
                        nextPulse.path = new b.PathLink(node, nextPulse.path);
                        b.propagatePulse(
                            nextPulse,
                            node.sendsTo);
                    };
                })(nodes[i]), 
                new b.Pulse(pulse.stamp, pulse.path, pulse.value));
            stackHeight--;
         }
         if (stackHeight === 0) {
             if ( !(queue.isEmpty()) ) {
                queue.pop().v(); //propagates itself
             }             
             if ( incomingQueue.length > 0 ) {
                var args = incomingQueue.shift();
                args[0] = new b.Pulse(e.nextStamp(), new b.PathEnd(), args[0]);
                b.propagatePulse.apply(this, args); 
             }
         }
    };

    // combinePulseFull:
    //      (int* -> int) 
    //      * (Path* -> Path) 
    //      * (Value*->Value) 
    //      . Array Pulse
    //      -> Pulse
    //Given pulse stamps/paths/values combiners and a list of pulses, return one new pulse
    flapjax.base.combinePulseFull = function (cs, cp, cv /* . pulses */)
    {
        var pulses = x.slice(arguments, 3);
        var t = [];
        var i;
 
        for (i = 0; i < pulses.length; i++) {t.push(pulses[i].stamp);}
        var csv = cs.apply(this, t);
     
        t = [];
        for (i = 0; i < pulses.length; i++) {t.push(pulses[i].path);}
        var cpv = cp.apply(this, t);

        t = [];
        for (i = 0; i < pulses.length; i++) {t.push(pulses[i].value);}
        var cvv = cv.apply(this, t);
        
        return new flapjax.base.Pulse(csv, cpv, cvv);
    };

    // combinePulse: ( . Array Value -> Value) . Array Pulse -> Pulse
    flapjax.base.combinePulse = function (cv /* . pulses */)
    {
        var pulses = x.slice(arguments, 1);
        return flapjax.base.combinePulseFull.apply(
            this,
            [Math.max,
             flapjax.base.pathBranches,
             cv].concat(pulses));
    };
    
    for (var iii in flapjax.base) { $$___a({ul: true}, iii, flapjax.base[iii]); }
    $$___a({ul: true}, 'priorityQueue', flapjax.base.PQ);

    flapjax.engine = {
        
        stamp: 1,
        nextStamp: function () { return ++this.stamp; }
        
    };
    e = flapjax.engine;
 
    
    //Node: ( (Pulse a -> Void) * Pulse b -> Void) . Array Node b
    e.Node = function (updater /* . dependentNodes */ ) 
    {
        if (!(updater instanceof Function)) { throw ('Node: expects update fn as first arg'); } //SAFETY
        this.updater = updater;
        
        this.sendsTo = []; //forward link
        
        //TODO check each is a Node
        //backlink
        //should only used for optimization purposes (disable evaluation now and then)
        this.listensTo = arguments.length > 1 ? x.slice(arguments, 1) : []; 
            
        for (var i = 1; i < arguments.length; i++) {
            arguments[i].sendsTo.push(this);
        }
        
        //-----rank calculation
        //  only impacts topologically evaluated nodes
        //  subsets of sendsTo, listensTo
        this.higherRanked = [];
        this.lowerRanked = x.slice(this.listensTo, 0); 

        var me = this;
        flapjax.lib.forEach(
            function (child) {
                child.higherRanked.push(me);
            },
            this.lowerRanked);
            
        this.rank =
            Math.max(
                0,
                Math.max.apply({}, 
                    flapjax.lib.map(
                        function (n) { return 1 + n.rank; },
                        this.lowerRanked.concat([0]))));
        //-----
    };
    $$___a({ul: true}, 'Event', e.Node);
    $$___a({ul: true}, 'Node', e.Node);

    //TODO: currently assumes no cycles
    //updateParentRanks: Node -> Void
    e.updateParentRanks = function (node) {
        node.rank =             
            Math.max(
                0,
                node.lowerRanked.length > 0 ?
                  Math.max.apply({}, 
                      flapjax.lib.map(
                          function (n) { return 1 + n.rank; },
                          node.lowerRanked)) :
                  0);
        node.rank = Math.max(0, node.rank);

        flapjax.lib.forEach(
            arguments.callee,
            node.higherRanked);
    
    };
    $$___a({ul: true, np: true, e: true, a: 0}, 'updateParentRanks', e.updateParentRanks);

    
    //BasicNode: Array Node b * ( (Pulse a -> Void) * Pulse b -> Void)
    e.BasicNode = function (dependsOn, updater) 
    {
        if (!(updater instanceof Function)) { throw 'BasicNode: expects updater fn as second argument'; } //SAFETY
        this.updater = updater;
        
        this.listensTo = dependsOn.length > 0 ? x.slice(dependsOn, 0) : [];
        this.sendsTo = [];

        for (var i = 0; i < dependsOn.length; i++) { 
            if (!(dependsOn[i] instanceof e.Node)) { throw ('BasicNode: expects array of events as first arg, received:' + dependsOn[i]); } //SAFETY
            dependsOn[i].sendsTo.push(this); 
        } 
        
        //-----rank calculation
        this.lowerRanked = x.slice(dependsOn, 0);
        this.higherRanked = []; 

        var me = this;
        flapjax.lib.forEach(
            function (node) {
                node.higherRanked.push(me);
            },
            this.lowerRanked);
            
        this.rank =
            Math.max(
                0, 
                Math.max.apply({}, 
                    flapjax.lib.map(
                        function (n) { return 1 + n.rank; },
                        this.lowerRanked.concat([0]))));
        //------
        e.updateParentRanks(this);
    };
    e.BasicNode.prototype = new e.Node(function (v) {});
    e.BasicNode.constructor = e.BasicNode;

    //createNode: Maybe Node * Array Node a * ( (Pulse b ->) * (Pulse a) -> Void) -> Node b
    e.createNode = function (maybeKeyNode, nodes, updater) 
    {
        if (!(updater instanceof Function)) { throw 'createNode: expects updater as 3d arg'; } //SAFETY
        if (maybeKeyNode instanceof b.MaybeFull) { 
            return e.createKeyNode(maybeKeyNode.value, nodes, updater);
        } else if (maybeKeyNode instanceof b.MaybeEmpty) {
            return new e.BasicNode(nodes, updater);
        } else {
            throw ('createNode: expects Maybe Event as first argument, received: ' + maybeKeyNode); //SAFETY
        }
    };
    e.createNode.prototype.keyNode = null;
    $$___a({ul: true, c: true}, 'event_e', e.createNode);
    

    //createTopologicalNode: Maybe Node * Node a -> Node a
    //defer node receiving a pulse until graph has stabilized and all topological
    //  nodes with lesser rank have receiver their pulses
    e.createTopologicalNode = function (maybeKeyNode, node)
    {
        return e.createNode(
            maybeKeyNode,
            [node],
            function (s, p) {
                queue.insert({
                    k: node.rank, 
                    v: function () { s(p); }});
            });
    };
    $$___a({ul: true, c: true, e: true, a: 1},'topological_e', e.createTopologicalNode);
    $$___a({ul: true, np: true, c: true, e: true, a: 1},'topological', e.createTopologicalNode);
    $$___a({ul: true, np: true, c: true, e: true, a: 1},'waitTopologically', e.createTopologicalNode);
    
    
    //raise_e: Maybe Node * Node a * Array Node b -> Node a
    //create proxy node with topological rank above that of the maximum of a set of others
    //note: not topologically evaluated, pass to topological_e to do that
    e.raise_e = function (maybeKeyNode, node, nodes) {
        if (!(nodes instanceof Array)) { throw 'raise_e: expects array as 3d arg'; }
        var resE = 
            e.createNode(
                maybeKeyNode,
                [node],
                c.continueEvent);
        for (var i = 0; i < nodes.length; i++) {
            resE.lowerRanked.push(nodes[i]);
            nodes[i].higherRanked.push(resE);
        }
        return resE;
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'raise_e', e.raise_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'raise', e.raise_e);
            
    //attachListenerNode: Node * Node -> Voids
    //flow from node to dependent
    //note: does not add flow as counting for rank nor updates parent ranks
    //  (use node.higherRanked and node.lowerRanked, updateParentRanks)
    e.attachListenerNode = function (node, dependent)  
    {
        if (!(node instanceof e.Node)) { throw 'attachListenenerNode: expects event as first arg';} //SAFETY
        if (!(dependent instanceof e.Node)) { throw 'attachListenenerNode: expects event as second arg';} //SAFETY

        node.sendsTo.push(dependent);
        dependent.listensTo.push(node);
    };
    $$___a({ul: true, np: true, e: true, a: 0}, 'attachListener',  e.attachListenerNode);
    
    //removeListenerNode: Node * Node -> Boolean
    //remove flow from node to dependent
    //note: does not remove flow as counting for rank nor updates parent ranks
    //  (use node.higherRanked and node.lowerRanked, updateParentRanks)
    e.removeListenerNode = function (node, dependent)
    {
        if (!(node instanceof e.Node)) { throw 'removeListenerNode: expects event as first arg';} //SAFETY
        if (!(dependent instanceof e.Node)) { throw 'removeListenenerNode: expects event as second arg';} //SAFETY

        var foundSending = false;
        for (var i = 0; i < node.sendsTo.length && !foundSending; i++) {
            if (node.sendsTo[i] == dependent) {
                node.sendsTo.splice(i, 1);
                foundSending = true;
            }
        }
        
        var foundReceiving = false;
        for (var j = 0; j < dependent.listensTo.length && !foundReceiving; j++) {
            if (dependent.listensTo[j] == node) {
                dependent.listensTo.splice(j, 1);
                foundReceiving = true;
            }
        }
        
        return foundSending && foundReceiving;
    };
    $$___a({np: true, e: true, a: 0}, 'removeListener', e.removeListenerNode);

    //createConstantNode: Maybe Node * Array Node U Node * a -> Node a
    e.createConstantNode = function (maybeKeyNode, nodes, value) 
    {
        if (!(maybeKeyNode instanceof b.Maybe)) { throw 'createConstantNode: expects Maybe node'; } //SAFETY
        return e.createNode(
            maybeKeyNode,
            nodes instanceof Array ? nodes : [nodes], 
            function (send, pulse) {
                pulse.value = value;
                send(pulse);
            });
    };
    $$___a({ul: true, e: true, c: true, a: 1}, 'constant_e', e.createConstantNode);
    $$___a({ul: true, np: true, e: true, c: true, a: 1}, 'constant', e.createConstantNode);
    $$___a({ul: true, np: true, e: true, c: true, a: 1}, 'replaceValue', e.createConstantNode);
    $$___a({ul: true, e: true, c: true, a: 1}, 'replaceValue_e', e.createConstantNode);

    //createKeyNode: Node * Array Node a * ( (Pulse b ->) * (Pulse a) -> Void) -> Node b    
    // queue pulses for a timestamp until triggerNode activated, at which point release them
    // if trigger node was already activated for a timestamp, any pulse is instantly propagated
    // if no trigger for a timesamp, queue the pulse
    e.createKeyNode = function (triggerNode, normalNodes, updater)
    {
        if (!(triggerNode instanceof e.Node)) { throw 'createKeyNode: expected Event as first arg'; } //SAFETY
        if (!(updater instanceof Function)) { throw 'createKeyNode: expected updater as third arg'; } //SAFETY
        
        var keySeenTimes = [];
        var log = [];
        var dependsOn = x.slice(normalNodes, 0);
        dependsOn.push(triggerNode); //created node has rank higher than key
        var newNodeRef = {}; //TODO hacky, could create event receiver, but would have to set rank
        var newNode = 
            new e.BasicNode(
                dependsOn,
                function (send, newPulse) {
                    if (triggerNode == newPulse.path.towards) {
                        if (newPulse.value &&
                            !l.member(newPulse.stamp, keySeenTimes)) {
                            var todo = [];
                            keySeenTimes.push(newPulse.stamp);
                            for (var i = 0; i < log.length; i++) {
                                if (log[i].stamp == newPulse.stamp) {
                                    todo.push(log[i]);
                                    log.pop(i);
                                } 
                            }
                            for (var j = 0; j < todo.length; j++) {
                                b.propagatePulse(
                                    todo[j].pulse, 
                                    [newNodeRef.newNode]);
                            }
                        } 
                    } else if (l.member(newPulse.stamp, keySeenTimes)) {
                        updater(send, newPulse);
                    } else {
                        log.unshift({stamp: newPulse.stamp, pulse: newPulse}); 
                    }
                });
        newNodeRef.newNode = newNode;
        e.updateParentRanks(newNode);
        return newNode;
    };
    $$___a({ul: true}, 'key_e', e.createKeyNode);

    //createTimeSyncNode2: Maybe Node * Node a * Node b * ( Pulse a * Pulse b -> ) ->
    //cycles can occur within same stamp, up to updater to not send
    e.createTimeSyncNode2 = function (maybeKeyNode, node0, node1, updater) 
    {
        if (!(maybeKeyNode instanceof b.Maybe)) { throw 'createTimeSyncNode2: expects Maybe Event as first arg'; } //SAFETY
        if (!(node0 instanceof e.Node)) { throw 'createTimeSyncNode2: expects Event as second arg'; } //SAFETY
        if (!(node1 instanceof e.Node)) { throw 'createTimeSyncNode2: expects Event as third arg'; } //SAFETY
        if (!(updater instanceof Function)) { throw 'createTimeSyncNode2: expects updater as fourth arg'; } //SAFETY

        var log = [];
        var res = e.createNode(
            maybeKeyNode,
            [node0, node1],
            function (send, pulse) {
                var found = false;
                var newLog = [];
                for (var i = 0; i < log.length; i++) {
                    //new record to update or propagate
                    var newRec;
                    var newt = Math.max(i.stamp, pulse.stamp);
                    if (pulse.path.towards == node0) {
                        newRec = 
                            {
                                stamp: newt, 
                                maybePulse0: new b.MaybeFull(pulse), 
                                maybePulse1: log[i].maybePulse1
                            };
                    } else if (pulse.path.towards == node1) {
                        newRec = 
                            {
                                stamp: newt, 
                                maybePulse0: log[i].maybePulse0, 
                                maybePulse1: new b.MaybeFull(pulse)
                            };
                    } else {
                        throw 'timesync2: received pulse from unexpected node';
                    }
            
                    if (log[i].stamp == pulse.stamp) {
                        if (newRec.maybePulse0 instanceof b.MaybeFull &&
                            newRec.maybePulse1 instanceof b.MaybeFull) 
                        {
                            updater(
                                send, 
                                newRec.maybePulse0.value, 
                                newRec.maybePulse1.value); 
                        } else { newLog.push(newRec); } 
                        newLog.concat(x.slice(log, i + 1)); 
                        found = true;
                        break;
                    } else {
                        if ((newRec.maybePulse0 instanceof b.MaybeFull) &&
                            (newRec.maybePulse1 instanceof b.MaybeFull) &&
                            !b.isCommonPath(
                                newRec.maybePulse0.value.path, 
                                newRec.maybePulse1.value.path)) 
                        {
                            if (i == log.length) { 
                                //TODO: length or most recent match? Maybe they are the same?
                                updater(
                                    send, 
                                    newRec.maybePulse0.value, 
                                    newRec.maybePulse1);
                                found = true;
                                break;
                            } 
                        } else { newLog.push(log[i]); }
                    }
                }

                if (!found) { //haven''t seen it, so make new record and wait
                    if (pulse.path.towards == node0) { 
                        newLog.push(
                            {
                                stamp: pulse.stamp, 
                                maybePulse0: new b.MaybeFull(pulse), 
                                maybePulse1: b.maybeEmpty
                            });
                    } else if (pulse.path.towards == node1) { 
                        newLog.push(
                            {
                                    stamp: pulse.stamp, 
                                maybePulse0: b.maybeEmpty, 
                                maybePulse1: new b.MaybeFull(pulse)
                            });
                    } else { throw 'timesync2: received pulse from unexpected node'; }
                }
                log = newLog;   
            });
        return res; 
    };

    e.timeSyncIntUpdater = function (send, p0, p1) 
    {
        if (!(send instanceof Function)) { throw 'timeSyncIntUpdater: expects send as first arg'; } //SAFETY
        if (!(p0 instanceof b.Pulse)) { throw 'timeSyncIntUpdater: expects Pulse as second arg'; } //SAFETY
        if (!(p1 instanceof b.Pulse)) { throw 'timeSyncIntUpdater: expects Pulse as third arg'; } //SAFETY
        send(b.combinePulse(function () { /* TODO make destructive? */ return p0.value.concat([p1]); }, p0, p1)); 
    };
    
    //TODO topological timesync
    //createTimeSyncNode: Maybe Node * Array Node a * ( (Pulse b -> ) * . Array Pulse a -> )    -> Node b
    e.createTimeSyncNode = function (maybeKeyNode, nodes, updater) 
    {
        if (!(maybeKeyNode instanceof b.Maybe)) { throw 'createTimeSyncNode: expected Maybe Event as first arg'; } //SAFETY
        if (!(updater instanceof Function)) { throw 'createTimeSyncNode: expected updater as third arg'; } //SAFETY

        if (nodes.length < 2) { 
            return e.createNode(maybeKeyNode, nodes, updater);
        } else { 
            var interNode = 
                e.createNode(
                    maybeKeyNode, 
                    [nodes[0]],
                    function (send, pulse) {
                        send(new b.Pulse(pulse.stamp, pulse.path, [pulse]));
                    }); 
            for (var i = 1; i < nodes.length - 1; i++) {
                interNode = 
                    e.createTimeSyncNode2(
                        maybeKeyNode, 
                        interNode, 
                        nodes[i], 
                        e.timeSyncIntUpdater);
            }
            var res = 
                e.createTimeSyncNode2(
                    maybeKeyNode, 
                    interNode, 
                    nodes[nodes.length - 1], 
                    function(s, p0, p1) {
                        updater.apply(this, [s].concat(p0.value).concat([p1]));
                    });
            return res;
        }
    };
    
    //createFrTimeNode: Maybe Node * Array Node * ( (Pulse -> ) * Pulse -> )  -> Node
    //used for lifting
    e.createFrTimeNode = function (maybeKeyNode, nodes, updater) 
    {
        if (!(maybeKeyNode instanceof b.Maybe)) { throw 'createFrTimeNode: expected Maybe Event as first arg'; } //SAFETY
        if (!(updater instanceof Function)) { throw 'createFrTimeNode: expected updater as third arg'; } //SAFETY
        
        var context = this;
        var res = 
        e.createTimeSyncNode(
            maybeKeyNode, 
            nodes, 
            function (send /* . pulses */) {
                var pulses = x.slice(arguments, 1);
                send(b.combinePulse.apply(context,[updater].concat(pulses)));
            });
        return res;
    };  
    
    //timeSyncv2_e: Maybe Event * Array Event a -> Event Array a
    e.timeSyncv2_e = function (maybeKeyNode, nodes) {

        if (nodes.length == 1) {
            return c.createEventReceiver(maybeKeyNode);
        } else if (nodes.length == 1) {
            return c.map_ev(maybeKeyNode, function (v) { return [v]; }, nodes[0]);
        } else {

            var acc = c.map_ev(
                    maybeKeyNode, 
                    function (v) { return [v]; }, 
                    nodes[0]);
            var restNodes = x.slice(nodes, 1);

            for (var i = 0; i < restNodes.length; i++) {
                acc = 
                    e.createNode(
                        maybeKeyNode,
                        [acc, restNodes[i]],
                        (function (ii, accacc) {
                            var aLog =[]; 
                            var bLog = [];
                            return function (s, p)  {
                                if (p.path.towards == accacc) { aLog.push(p);}
                                if (p.path.towards == restNodes[ii]) { bLog.push(p);}
                                if ((aLog.length > 0) && (bLog.length > 0)) {
                                    var aPulse = aLog.shift();
                                    var bPulse = bLog.shift();
                                    s(new b.Pulse(
                                            Math.max(aPulse.stamp, bPulse.stamp),
                                            bPulse.path,
                                            (function () {
                                                aPulse.value.push(bPulse.value);
                                                return aPulse.value;
                                            })()));
                                } 
                            };
                        })(i, acc));
            }
            return acc;
        }
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'sync_e', e.createTimeSyncNode);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'sync', e.createTimeSyncNode);

    flapjax.combinators = {};
    c = flapjax.combinators;

    //good for leaves, easy hook to forward pulses
    c.createEventReceiver = function (maybeKeyNode) 
    { 
        return e.createNode(
            maybeKeyNode, 
            [], 
            function(send, pulse) {send(pulse);});
    };
    $$___a({ul: true, c: true}, 'receiver_e', c.createEventReceiver);

    c.continueEvent = function (s, p) { s(p); };

    //artificially send a pulse to a node, as if from a child
    //note that this is immediate (topologically)
    //see receiveEvent as well
    c.sendEvent = function (node, value) 
    {
        if (!(node instanceof e.Node)) { throw 'sendEvent: expected Event as first arg'; } //SAFETY

        b.propagatePulse(
            new b.Pulse(e.nextStamp(), new b.PathEnd(), value), 
            [node]);
    };
    $$___a({ul: true, np: true, e: true, a: 0}, 'sendEvent', c.sendEvent);
    
    c.map_e = function (maybeKeyNode, proc, event) 
    {
        if (!(proc instanceof Function)) { throw 'map_e: expected fn as second argument'; } //SAFETY
        if (!(event instanceof e.Node)) { throw 'map_e: expected event as third argument'; } //SAFETY

        return e.createNode(
            maybeKeyNode, 
            [event], 
            function (send, pulse) { send(proc(pulse)); });
    };

    //TODO case event is a value
    //wrap the value of a node
    c.map_ev = function (maybeKeyNode, proc, event) 
    {
        if (!(proc instanceof Function)) { throw 'map_ev: expected function as second arg'; } //SAFETY
        if (!(event instanceof e.Node)) { throw 'map_ev: expected Event as third arg'; } //SAFETY

    return e.createNode(maybeKeyNode, [event], function (s, p) { p.value = proc(p.value); s(p); });
    };
//  $$__ce('map_e', c.map_ev);
//  $$___a({c: true, e: true, a: 2}, 'map_e', c.map_ev);
//  $$___a({np: true, c: true, e: true, a: 2}, 'map', c.map_ev);
//  $$___a({np: true, c: true, e: true, a: 2}, 'transformEach', c.map_ev);
    
    c.not_e = function (maybeKeyNode, event)
    {
        if (!(event instanceof e.Node)) { throw 'not_e: expected Event as second arg'; } //SAFETY
        
        return c.map_ev(maybeKeyNode, function (v) { return !v; }, event);
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'not_e', c.not_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'not', c.not_e);

    //wrap a node, filtering out pulses that fail a predicate
    c.filter_e = function (maybeKeyNode, pred, event) 
    {
        if (!(pred instanceof Function)) { throw 'filter_e: expected pred as second arg'; } //SAFETY
        if (!(event instanceof e.Node)) { throw 'filter_e: expected Event as third arg'; } //SAFETY
        
        return e.createNode(
            maybeKeyNode, 
            [event], 
            function (send, pulse) {if (pred(pulse)) { send(pulse); } });
    };

    //wrap a node, filtering out pulses that fail a predicate on their value
    // MMG: allow time-varying pred?
    c.filter_ev = function (maybeKeyNode, pred, event) 
    {
        if (!(pred instanceof Function)) { throw 'filter_ev: expected pred as second arg'; } //SAFETY
        if (!(event instanceof e.Node)) { throw 'filter_ev: expected Event as third arg'; } //SAFETY
        
        return c.filter_e(
            maybeKeyNode, 
            function (pulse) {return pred(pulse.value);}, 
            event);
    };
    $$___a({ul: true, c: true, e: true, a: 2}, 'filter_e', c.filter_ev); //TODO syntax
    $$___a({ul: true, np: true, c: true, e: true, a: 2}, 'filter', c.filter_ev); //TODO syntax
    
    c.filterExists_e = function (maybeKeyNode, event) 
    {
        return c.filter_ev(maybeKeyNode, function (v) { return v;}, event); 
    }
    $$___a({ul: true, c: true, e: true, a: 1}, 'filterExists_e', c.filterExists_e); //TODO syntax
    

    c.filterTrue_e = function (maybeKeyNode, event) 
    {
        return c.filter_ev(maybeKeyNode, function (v) { return v===true;}, event); 
    }
    $$___a({ul: true, c: true, e: true, a: 1}, 'filterTrue_e', c.filterTrue_e); //TODO syntax
    
    //allow any pulse from a group to  propagate out of a new node
    c.merge_e = function (maybeKeyNode /* . dependentNodes */ ) 
    {   
        var dependentNodes = 
            ((arguments.length === 1)? [] : x.slice(arguments, 1)); 
        return e.createNode(maybeKeyNode, dependentNodes, c.continueEvent); 
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'merge_e', c.merge_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'merge', c.merge_e);

    c.createMergeGroup = function (maybeKeyNode) 
    { 
        if (!(maybeKeyNode instanceof b.Maybe)) { throw 'createMergeGroup: expected Maybe Event as first arg'; } //SAFETY
            
        return c.merge_e(maybeKeyNode); 
    };

    c.mergeGroupAdd = function (mg, newEvent) 
    {
        if (!(mg instanceof e.Node)) { throw 'mergeGroupAdd: expected Event as first arg'; } //SAFETY
        if (!(newEvent instanceof e.Node)) { throw 'mergeGroupAdd: expected Event as second arg'; } //SAFETY

        return e.attachListenerNode(newEvent, mg);
    };

    //allow a node to propagate only once
    c.once_e = function (maybeKeyNode, event) 
    {
        if (!(event instanceof e.Node)) { throw 'once_e: expected Event as second arg'; } //SAFETY

        var done = false;
        return e.createNode(
            maybeKeyNode, 
            [event],
            (function () {
                done = false;
                return function (send, pulse) {
                        if (!done) {done = true; send(pulse); }
                }; })());
    };
    $$___a({ul: true, c: true, e: true, a: 1} ,'once_e', c.once_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1} ,'once', c.once_e);

    //skip first pulse - can be encoded as collect..
    c.skipFirst = function (maybeKeyNode, event) 
    {
        if (!(event instanceof e.Node)) { throw 'once_e: expected Event as second arg'; } //SAFETY

        return e.createNode(
            maybeKeyNode, 
            [event],
            (function () {
                var done = false;
                return function (send, pulse) {
                        if (done) {send(pulse); }
                        else {done = true; }
                }; })());
    };
    $$___a({ul: true, c: true, e: true, a: 1} ,'skipFirst_e', c.skipFirst);
    $$___a({ul: true, np: true, c: true, e: true, a: 1} ,'skipFirst', c.skipFirst);

    c.createCollect = function (map_xx) 
    {
        return function (maybeKeyNode, event, init, fold) {
            var acc = init;
            return map_xx(
                maybeKeyNode, 
                function (n) {
                    var next = fold(n, acc);
                    acc = next;
                    return next;
                },
                event); 
        };
    };

    c.collect_e = c.createCollect(c.map_e);
    c.collect_ev = c.createCollect(c.map_ev);
//  $$__ce('collect_e', c.collect_ev);
    $$___a({ul: true, c: true, e: true, a: 1}, 'collect_e', c.collect_ev);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'collect', c.collect_ev);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'transformWithMemory', c.collect_ev);

    //TODO SO DEPRECATED!!
    //gets keying, unlike switch atm, internal only for now
    //rSwitch_e : Maybe Event * Event (Maybe Event -> Event a) -> Event a
    c.rSwitch_e = function (maybeKeyNode, eventCreatorsE)
    {   
        var prevSourceEM = new b.MaybeEmpty();
    
        var receiverE = new c.createEventReceiver(maybeKeyNode);
    
        e.createNode(
            maybeKeyNode, 
            [eventCreatorsE],
            function (s, p) {
                var keyToStreamFn = p.value;
                if (!(keyToStreamFn instanceof Function)) { throw 'rSwitch_e: expected function as value of input event'; } //SAFETY
                if (prevSourceEM instanceof b.MaybeFull) {
                    e.removeListenerNode(prevSourceEM.value, receiverE);
                }
                prevSourceEM = new b.MaybeFull(keyToStreamFn(maybeKeyNode));
                if (!(prevSourceEM.value instanceof e.Node)) { throw 'rSwitch_e: expected event stream as result of function application'; } //SAFETY
                e.attachListenerNode(prevSourceEM.value, receiverE);
                
                receiverE.lowerRanked.push(prevSourceEM.value); //increase rank by new link 
                prevSourceEM.value.higherRanked.push(receiverE);
                e.updateParentRanks(receiverE);
            });
            
        return receiverE;               
    };
//  $$__ce('rSwitch_e', c.rSwitch_e);
    
    //switch_e: Maybe Event * Event Event a -> Event a
    c.switch_e = function (maybeKeyNode, eventStreamsE) {

        var prevSourceEM = new b.MaybeEmpty();
    
        var receiverE = new c.createEventReceiver(maybeKeyNode);
    
        e.createNode(
            maybeKeyNode, 
            [eventStreamsE],
            function (s, p) {
                if (!(p.value instanceof e.Node)) { throw 'switch_e: expected event as value of input event'; } //SAFETY
                if (prevSourceEM instanceof b.MaybeFull) {
                    e.removeListenerNode(prevSourceEM.value, receiverE);
                }
                prevSourceEM = new b.MaybeFull(p.value);
                e.attachListenerNode(prevSourceEM.value, receiverE);
                
                receiverE.lowerRanked.push(prevSourceEM.value); //increase rank by new link 
                prevSourceEM.value.higherRanked.push(receiverE);
                e.updateParentRanks(receiverE); 
            });
            
        return receiverE;

    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'switch_e', c.switch_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'forwardLatest', c.switch_e);

    //squeeze_e: Maybe Event * Event a -> Event a
    //Only events with current or fresher stamp propagate, and only 1 per step
    c.squeeze_e = function (maybeKeyNode, triggerE) {
    
        var prevTime = flapjax.engine.stamp - 1;
    
        return e.createNode(
            maybeKeyNode,
            function (s, p) {
                if (p.stamp > prevTime) {
                    prevTime = p.stamp;
                    s(p);
                }
            },
            triggerE);
    };
    $$___a({ul: true, c: true, e:true, a: 1}, 'squeeze_e', c.squeeze_e);      

    //warning: branches will get evaluated, just not propagated
    //note: probably cleaner if redone with topographical evaluation 
    c.if_e = function (maybeKeyNode, testNode, thenExpr, elseExpr) 
    {
        return (!(testNode instanceof e.Node)) ?  
           (testNode? thenExpr : elseExpr) :
           c.merge_e(
                   maybeKeyNode,
                   e.createKeyNode(testNode, [thenExpr], c.continueEvent),
                   e.createKeyNode(
                       c.map_ev(maybeKeyNode, function(v){return !v;}, testNode), 
                       [elseExpr],
                       c.continueEvent));
    };
//  $$__ce('if_e', c.if_e);
    $$___a({ul: true, c: true, e:true, a: 1}, 'if_e', c.if_e);
    $$___a({ul: true, c: true, e:true, a: 1}, 'choose_e', c.if_e);
    $$___a({ul: true, np: true, c: true, e:true, a: 1}, 'choose', c.if_e);
    
    //TODO: test expr really should be a thunk as well
    //TODO: return undefined or null? currently undefined
    //TODO: special case last argument as an else? Its pred is fn.{return true}
    c.cond_e = function (maybeKeyNode /*. predValArrays */) 
    {
        var predValArrays = x.slice(arguments, 1);
        var acc = e.createConstantNode(maybeKeyNode, [], undefined);
        for (var i = predValArrays.length - 1; i > -1; i--) {
            acc = c.if_e(maybeKeyNode, predValArrays[i][0], predValArrays[i][1], acc);
        }
        return acc; 
    };
    $$___a({ul: true, c: true}, 'cond_e', c.cond_e);

    //TODO when should it return false?
    //TODO fix sig
    //and_e: Maybe Node * . Array [Node] Boolean -> Node Boolean
    c.and_e = function (maybeKeyNode /* . nodes */) 
    {
        var nodes = x.slice(arguments, 1);

        var acc = (nodes.length > 0)? 
            nodes[nodes.length - 1] : e.createConstantNode(maybeKeyNode, true);

        for (var i = nodes.length - 2; i > -1; i--) {
            acc = c.if_e(
                maybeKeyNode, 
                nodes[i], 
                acc, 
                c.map_ev(maybeKeyNode, function (_) {return false;}, nodes[i]));
        }
        return acc;
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'and_e', c.and_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'and', c.and_e);

    //TODO determine KeyNode
    c.or_e = function (maybeKeyNode) 
    {
        var nodes = x.slice(arguments, 1);
        var acc = (nodes.length > 2)? 
            nodes[nodes.length - 1] : e.constantFalseNode; //TODO check if const def'd
        for (var i = nodes.length - 2; i > -1; i--) {
            acc = c.if_e(maybeKeyNode, 
            nodes[i],
            nodes[i],
            acc);
        }
        return acc;
    };  
    $$___a({ul: true, c: true, e: true, a: 1}, 'or_e', c.or_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'or', c.or_e);
        
    //TODO: manual timer management stinks.
    // TODO: Name turn off or somethin
    c.___timerID = 0;
    c.__getTimerId = function () { return ++c.___timerID; };    
    c.timerDisablers = [];

    c.disableTimerNode = function (node) { c.timerDisablers[node.__timerId](); };

    c.disableTimer = function (v) 
    {
        if (v instanceof be.Behaviour) { 
            c.disableTimerNode(v.underlyingRaw); 
        } else if (v instanceof e.Node) {
            c.disableTimerNode(v);
        }
    };
    $$___a({ul: true, e: true, a: 0}, 'disableTimer', c.disableTimer); 
    
    c.dateObj = new Date();
    c.createTimerNodeStatic = function (maybeKeyNode, interval) 
    {
//      if (!(interval instanceof Number)) { throw 'createTimerNode: expects number as second arg'; } //SAFETY

        var node = c.createEventReceiver(maybeKeyNode);
        node.__timerId = c.__getTimerId();
        var fn = function () {c.sendEvent(node, (new Date()).getTime());};
        var timer = setInterval(fn, interval);
        c.timerDisablers[node.__timerId] = function () {clearInterval(timer); };
        return node;
    };
    
    //TODO new node should have rank 0
    c.createTimerNode = function (maybeKeyNode, interval)
    {
        if (interval instanceof be.Behaviour) {
            var receiverE = c.createEventReceiver(maybeKeyNode);
            
            //the return
            var res = c.switch_e(maybeKeyNode, receiverE);
                    
            //keep track of previous timer to disable it
            var prevE = c.createTimerNodeStatic(maybeKeyNode,  be.valueNow(interval));
                    
            //init
            c.sendEvent(receiverE, prevE);
                    
            //interval changes: collect old timer
            e.createNode(
                maybeKeyNode,
                [be.changes(interval)],
                function (_, p) {
                    c.disableTimerNode(prevE); 
                    prevE = c.createTimerNodeStatic(maybeKeyNode,p.value);
                    c.sendEvent(receiverE, prevE);
                });

            res.__timerId = c.__getTimerId();
            c.timerDisablers[res.__timerId] = function () {
                    c.disableTimerNode[prevE]();
                    return;
                };
                
            return res;
        } else {
            return c.createTimerNodeStatic(maybeKeyNode, interval);
        }
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'timer_e', c.createTimerNode); //so attached to an interval behaviour
    $$___a({ul: true, np: true, c: true, b: true, a: 1}, 'asTimer_e', c.createTimerNode); //so attached to an interval behaviour
    
    c.delayStatic_e = function (maybeKeyNode, event, time)
    {
    
        var resE = c.createEventReceiver(maybeKeyNode);
    
        e.createNode(
            maybeKeyNode,
            [event],
            function (s, p) { 
                setTimeout( 
                    function () { c.sendEvent(resE, p.value);}, 
                    time ); });
                    
        return resE;
    };
    
    //TODO new node should have rank 0
    //TODO should use switch_e, not rSwitch_e
    //delay_e: Maybe Event * Event a * [Behaviour] Number ->  Event a
    c.delay_e = function (maybeKeyNode, event, time)
    {
        if (time instanceof be.Behaviour) {

            var receiverEE = c.createEventReceiver(maybeKeyNode);
            var link = 
                {
                    from: event, 
                    towards: c.delayStatic_e(maybeKeyNode, event, be.valueNow(time))
                };
                
            var switcherE = 
                e.createNode(
                    maybeKeyNode,
                    [be.changes(time)],
                    function (s, p) {
                        e.removeListenerNode(link.from, link.towards); 
                        link =
                            {
                                from: event, 
                                towards: c.delayStatic_e(maybeKeyNode, event, p.value)
                            };
                        c.sendEvent(receiverEE, link.towards);
                    });
                    
            var resE =
                c.rSwitch_e(
                    maybeKeyNode, 
                    c.map_ev(
                        maybeKeyNode,
                        function (streamE) {
                            return function (keyE) { 
                                return e.createNode(
                                    keyE,
                                    [streamE],
                                    c.continueEvent);
                            };
                        },
                        receiverEE));

            c.sendEvent(switcherE, be.valueNow(time));
            return resE;

        } else { return c.delayStatic_e(maybeKeyNode, event, time); }
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'delay_e', c.delay_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'delay', c.delay_e);

    //lift_e: ([Event] (. Array a -> b)) . Array [Event] a -> [Event] b
    c.lift_e = function (maybeKeyNode, fn /*, [node0 | val0], ...*/) 
    {
//      if (!(fn instanceof Function)) { throw 'lift_e: expected fn as second arg'; } //SAFETY

        var valsOrNodes = x.slice(arguments, 1);
        //selectors[i]() returns either the node or real val, optimize real vals
        var selectors = [];
        var selectI = 0;
        var nodes = [];
        for (var i = 0; i < valsOrNodes.length; i++) {
            if (valsOrNodes[i] instanceof e.Node) {
                nodes.push(valsOrNodes[i]);
                selectors.push( 
                    (function(ii) {
                        return function(realArgs) { 
                            return realArgs[ii];
                        };
                    })(selectI));
                selectI++;
            } else {
                selectors.push( 
                    (function(aa) { 
                        return function () {
                            return aa;
                        }; 
                    })(valsOrNodes[i]));
            } 
        }
    
        var context = this;

        if (nodes.length === 0) {
            return e.createConstantNode(
                maybeKeyNode, 
                [], 
                fn.apply(context, valsOrNodes));
        } else if ((nodes.length === 1) && (fn instanceof Function)) {
            return c.map_ev(
                maybeKeyNode, 
                function () {
                    var args = arguments;
                    return fn.apply(
                        context, 
                        l.map(function (s) {return s(args);}, x.slice(selectors, 1)));
                }, 
                nodes[0]);
        } else if (nodes.length === 1) {
            return c.map_ev(
                maybeKeyNode, 
                function (v) {
                    var args = arguments;
                    return v.apply(
                        context, 
                        l.map(function (s) {return s(args);}, x.slice(selectors, 1)));
                }, 
                fn);                
        } else if (fn instanceof Function) {
            return c.map_ev(
                maybeKeyNode,
                function (arr) {
                    return fn.apply(
                        this,
                        l.map(function (s) { return s(arr); }, x.slice(selectors, 1)));
                },
                e.timeSyncv2_e(
                    maybeKeyNode,
                    nodes));
        } else if (fn instanceof e.Node) {
            return c.map_ev(
                maybeKeyNode,
                function (arr) {
                    return arr[0].apply(
                        this, 
                        l.map(function (s) {return s(arr); }, x.slice(selectors, 1)));
                },
                e.timeSyncv2_e(
                    maybeKeyNode, 
                    nodes));
        } else {throw 'unknown lift_e case';}
    };
    $$___a({ul: true, c: true, e: true, a: 2}, 'lift_e', c.lift_e); 
    $$___a({ul: true, np: true, c: true, e: true, a: 2}, 'lift', c.lift_e); 
    $$___a({ul: true, c: true, e: true, a: 2}, 'transform_e', c.lift_e); 
    $$___a({ul: true, c: true, e: true, a: 2}, 'map_e', c.lift_e); 
    $$___a({ul: true, np: true, c: true, e: true, a: 2}, 'transform', c.lift_e); 
    $$___a({ul: true, c: true, e: true, a: 1}, 'apply_e', c.lift_e); 

    c.arr_e = function (maybeKeyNode, fn) {
        //TODO really should compose key nodes
        return function (maybeKeyNode2) { 
            return c.lift_e.apply(this, [explicitContext !== true ? context : maybeKeyNode2].
                    concat(x.slice(arguments, 0)));
        };
    };

    //c.snapshot_e: Maybe Node * Node a * Behaviour b -> Node b
    c.snapshot_e = function (maybeKeyNode, triggerE, valueB) {
        return e.createNode(
            maybeKeyNode,
            [e.createTopologicalNode(
                maybeKeyNode, 
                c.merge_e(maybeKeyNode, triggerE, be.changes(valueB)))],
            function (s, p) {
                if (p.path.from.from.towards == triggerE) { //TODO check, createTopologicalNode call looks suspicious
                    p.value = be.valueNow(valueB);
                    s(p);
                }
            }); 
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'snapshot_e', c.snapshot_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'snapshot', c.snapshot_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'takeSnapshot', c.snapshot_e);




    //filterRepeats_e: Maybe Node * Node a [* Maybe a] -> Node a
    c.filterRepeats_e = function (maybeKeyNode, node, optStart)
    {
        if (!(node instanceof e.Node)) { throw 'filterRepeats_e: expected Event as second arg'; } //SAFETY

        return e.createNode(maybeKeyNode,
            [node],
            function () {
                var prev = optStart === undefined ? b.maybeEmpty : optStart; //TODO assert optStart instanceof b.Maybe
        return function (s, p) {
                    if ((prev instanceof b.MaybeEmpty) ||
                        (!l.isEqual(prev.value, p.value))) {
                        s(p);
                    }
                    prev = new b.MaybeFull(p.value);
                };
            }());
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'filterRepeats_e', c.filterRepeats_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'filterRepeats', c.filterRepeats_e);
    
    
    
    //credit Pete Hopkins
    c.calmStatic_e = function (maybeKeyNode, triggerE, time) {
         return e.createNode(
            maybeKeyNode,
            [triggerE],
            function() {
                var towards = null;
                return function (s, p) {
                    if (towards !== null) { clearTimeout(towards); }
                    towards = setTimeout( function () { towards = null; s(p); }, time );
                };
            }());   
    };
    
    //calm_e: Maybe Event * Event a * [Behaviour] Number -> Event a
    c.calm_e = function (maybeKeyNode, triggerE, time) {
        if (time instanceof be.Behaviour) {
         return e.createNode(
            maybeKeyNode,
            [triggerE],
            function() {
                var towards = null;
                return function (s, p) {
                    if (towards !== null) { clearTimeout(towards); }
                    towards = setTimeout( function () { towards = null; s(p); }, be.valueNow(time) );
                };
            }());               
        } else {
            return c.calmStatic_e.apply(this, arguments);       
        }
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'calm_e', c.calm_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'calm', c.calm_e);
    
    //blind_e: Maybe Event * Event a * [Behaviour] Number -> Event a
    c.blind_e = function (maybeKeyNode, triggerE, time) {
        return e.createNode(
            maybeKeyNode,
            [triggerE],
            function () {
                var intervalFn = 
                    time instanceof be.Behaviour?
                        function () { return be.valueNow(time); }
                        : function () { return time; };
                var lastSent = (new Date()).getTime() - intervalFn() - 1;
                return function (s, p) {
                    var curTime = (new Date()).getTime();
                    if (curTime - lastSent > intervalFn()) {
                        lastSent = curTime;
                        s(p);
                    }
                };
            }());
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'blind_e', c.blind_e);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'blind', c.blind_e);

    // TODO set l on all of the above combinators

    c.unlifted = function (f) {
            if (typeof(f) != 'function') { throw ('expected function, got ' + f); } // SAFETY
            f.___doNotLift = true;
            return f;
    };
    $$___a({ul: true}, 'unlifted', c.unlifted);
    $$___a({ul: true}, 'doNotLift', c.unlifted);

    flapjax.behaviours = {};
    be = flapjax.behaviours;


    //TODO: filter out repeats in event stream?
    be.Behaviour = function (maybeKeyNode, event, init) 
    {
        if (!(event instanceof e.Node)) { throw 'Behaviour: expected event as second arg'; } //SAFETY

        var behave = this;
        this.last = init;

        //sendEvent to this might impact other nodes on same topographical level
        //sendBehaviour defaults to this one
        //  smart default: sending to a stateful node will add message to state
        this.underlyingRaw = event;

        //unexposed, sendEvent to this will only impact dependents of this behaviour
        this.underlying =
            e.createNode(
                maybeKeyNode, 
                [event], 
                function (s, p) {
                    behave.last = p.value; 
                    s(p);
                });
    };
    $$___a({ul: true}, 'Behaviour', be.Behaviour);
    $$___a({ul: true}, 'Behavior', be.Behaviour);

    be.hold = function (maybeKeyNode, event, init) 
    {
        if (!(event instanceof e.Node)) { throw 'hold: expected event as second arg'; } //SAFETY

        return new be.Behaviour(maybeKeyNode, event, init);
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'hold', be.hold);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'toBehaviour', be.hold);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'toBehavior', be.hold);
    $$___a({ul: true, np: true, c: true, e: true, a: 1}, 'startsWith', be.hold);

    be.valueNow = function(behave) {return behave.last;};
    $$___a({ul: true, b: true, a: 0}, 'valueNow', be.valueNow);

//8/30/06 - leo -   behaviours only sensitive to value changes
//                  this may be bad when a child of an object changes (wouldn't be noticed)
    be.changes = function (behave) {return behave.underlying;};
//  be.changes = function (behave) {return behave.underlyingValueChange;};
    $$___a({ul: true, b: true, a: 0}, 'changes', be.changes);
    $$___a({ul: true, np: true, b: true, a: 0}, 'toEvent', be.changes);
    
    
    be.collect_b = function (maybeKeyNode, srcE, fn, strt) 
    {
        return be.hold(
            maybeKeyNode, 
            c.collect_ev(maybeKeyNode, srcE, strt, fn),
            strt);
    };
    
    $$___a({ul: true, e: true, c: true, a: 1}, 'collect_b', be.collect_b);
    
    //switch_b: 
    //      Maybe Event 
    //      * Behaviour Behaviour a
    //      -> Behaviour a
    //TODO Conal Elliott calls this untilB
    be.switch_b = function (maybeKeyNode, behaviourCreatorsB)
    {       
        var init = be.valueNow(behaviourCreatorsB);
    
        var prevSourceEM = new b.MaybeEmpty();
    
        var receiverE = new c.createEventReceiver(maybeKeyNode);

        var makerE = 
            e.createNode(
                maybeKeyNode, 
                [be.changes(behaviourCreatorsB)],
                function (_, p) {
                    if (!(p.value instanceof be.Behaviour)) { throw 'switch_b: expected Behaviour as value of Behaviour of second argument'; } //SAFETY
                    if (prevSourceEM instanceof b.MaybeFull) {
                        e.removeListenerNode(prevSourceEM.value, receiverE);
                    }
    
                    prevSourceEM = new b.MaybeFull(be.changes(p.value));
                    e.attachListenerNode(prevSourceEM.value, receiverE);
                    
                    receiverE.lowerRanked.push(prevSourceEM.value);
                    prevSourceEM.value.higherRanked.push(receiverE);
                    e.updateParentRanks(receiverE);
                    
                    c.sendEvent(receiverE, be.valueNow(p.value));
                });
        
        if (init instanceof be.Behaviour) {
            c.sendEvent(makerE, init);
        }
        
        return be.hold(
            maybeKeyNode,
            receiverE,
            init instanceof be.Behaviour? be.valueNow(init) : init);
    };
//  $$__cb('switch_b', be.switch_b);
    $$___a({ul: true, c: true, b: true, a: 1}, 'switch_b', be.switch_b);
    $$___a({ul: true, np: true, c: true, b: true, a: 1}, 'forwardLatest', be.switch_b);
    
    //TODO need to be able to destroy
    //TODO new node should have rank 0
    be.createTimerBehaviourStatic = function (maybeKeyNode, interval) 
    {
        return be.hold(
            maybeKeyNode, 
            c.createTimerNodeStatic(maybeKeyNode, interval), 
            (new Date()).getTime());
    };
    
    //TODO test, signature
    //TODO new node should have rank 0
    be.createTimerBehaviour = function (maybeKeyNode, interval)
    {
        return be.hold(
            maybeKeyNode, 
            c.createTimerNode(maybeKeyNode, interval), 
            (new Date()).getTime());
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'timer_b', be.createTimerBehaviour);
    $$___a({ul: true, np: true, c: true, b: true, a: 1}, 'asTimer_b', be.createTimerBehaviour);

    
    //TODO test, signature
    //TODO new node should have rank 0
    be.delayStatic_b = function (maybeKeyNode, triggerB, time, init)
    {
        return be.hold(
            maybeKeyNode,
            c.delayStatic_e(maybeKeyNode, be.changes(triggerB), time),
            init);
    };
    
    //TODO new node should have rank 0
    //TODO test, signature
    be.delay_b = function (maybeKeyNode, triggerB, time, init)
    {
        if (time instanceof be.Behaviour) {
            return be.hold(
                maybeKeyNode,
                c.delay_e(
                    maybeKeyNode, 
                    be.changes(triggerB), 
                    time),
                arguments.length > 3 ? init : be.valueNow(triggerB));
        } else {
            return be.delayStatic_b(
                maybeKeyNode, 
                triggerB, 
                time,
                arguments.length > 3 ? init : be.valueNow(triggerB));
        }
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'delay_b', be.delay_b);
    $$___a({ul: true, np: true, c: true, b: true, a: 1}, 'delay', be.delay_b);

    be.createBehaviourReceiver = function (maybeKeyNode, init) {
        return be.hold(maybeKeyNode, c.createEventReceiver(maybeKeyNode), init);
    };
    $$___a({ul: true, c: true}, 'receiver_b', be.createBehaviourReceiver);

    //artificially send a pulse to underlying event node of a behaviour
    //note: in use, might want to use a receiver node as a proxy or an identity map
    be.sendBehaviour = function (behave, val) 
    {
        if (!(behave instanceof be.Behaviour)) { throw 'sendBehaviour: expected Behaviour as first arg'; } //SAFETY
        c.sendEvent(behave.underlyingRaw, val);
    };
    $$___a({ul: true, b: true, a: 0}, 'sendBehaviour', be.sendBehaviour);
    $$___a({ul: true, b: true, a: 0}, 'sendBehavior', be.sendBehaviour);

    be.snapshot_b = function (maybeKeyNode, triggerE, valB) {
        return be.hold(maybeKeyNode, 
                       c.snapshot_e(maybeKeyNode, triggerE, valB), 
                       be.valueNow(valB));
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'snapshot_b', be.snapshot_b);


    //note that not topographically evaluated: public version is if2_b
    be.if_b = function (maybeKeyNode, testv, thenv, elsev) 
    {
        //TODO hacky way to guarentee Behaviour is returned
        if (!(testv instanceof be.Behaviour)) {
            return (testv && (thenv instanceof be.Behaviour)) ?
                thenv :
            (!testv && (elsev instanceof be.Behaviour)) ?
                elsev :
            be.createConstantB(maybeKeyNode, testv ? thenv : elsev);
        }
        
        var changes = [be.changes(testv)];
        if (thenv instanceof be.Behaviour) { changes.push(be.changes(thenv)); }
        if (elsev instanceof be.Behaviour) { changes.push(be.changes(elsev)); }
        
        var ifEvent = 
            e.createNode(
                maybeKeyNode, 
                changes,
                function(s, p) {
                    if ((p.path.towards == be.changes(testv)) ||
                        (be.valueNow(testv) &&
                            (thenv instanceof be.Behaviour) && 
                            (p.path.towards == be.changes(thenv))) ||
                        (!be.valueNow(testv) &&
                            (elsev instanceof be.Behaviour) &&
                            (p.path.towards == be.changes(elsev))))
                    {
                        p.value = be.valueNow(testv) ? 
                                    (thenv instanceof be.Behaviour ? be.valueNow(thenv) : thenv) :
                                    (elsev instanceof be.Behaviour ? be.valueNow(elsev) : elsev);
                        s(p);
                    } 
                });
    
        return new be.Behaviour(
            maybeKeyNode, 
            ifEvent, 
            (be.valueNow(testv) ?
                (thenv instanceof be.Behaviour? be.valueNow(thenv) : thenv) : 
                (elsev instanceof be.Behaviour? be.valueNow(elsev) : elsev)));
    };
//  $$__cb('if_b', be.if_b);
    
    be.if2_b = function (maybeKeyNode, testB, trueB, falseB) {

        //TODO auto conversion for behaviour funcs
        if (!(testB instanceof be.Behaviour)) { testB = be.createConstantB(maybeKeyNode, testB); }
        if (!(trueB instanceof be.Behaviour)) { trueB = be.createConstantB(maybeKeyNode, trueB); }
        if (!(falseB instanceof be.Behaviour)) { falseB = be.createConstantB(maybeKeyNode, falseB); }

        var tStream = 
            e.createNode(
                maybeKeyNode,
                [e.createTopologicalNode(
                    maybeKeyNode,
                    c.merge_e(
                        maybeKeyNode, 
                        be.changes(testB), 
                        be.changes(trueB)))],
                function (s, p) {
                    if (be.valueNow(testB)) { //TODO questionable pulse info
                        p.value = be.valueNow(trueB);
                        s(p);
                    }
                });
                 
        var fStream =
            e.createNode(
                maybeKeyNode,
                [e.createTopologicalNode(
                    maybeKeyNode,
                    c.merge_e(
                        maybeKeyNode, 
                        be.changes(testB), 
                        be.changes(falseB)))],
                function (s, p) {
                    if (!be.valueNow(testB)) { //TODO questionable stamp info
                        p.value = be.valueNow(falseB);
                        s(p);
                    }
                });
                
        return be.hold(
            maybeKeyNode,       
            c.merge_e(maybeKeyNode, tStream, fStream),
            be.valueNow(testB) ? be.valueNow(trueB) : be.valueNow(falseB));             
    };
//  $$__cb('if2_b', be.if2_b);
    $$___a({ul: true, c: true, b: true, a: 1}, 'if_b', be.if2_b);
    $$___a({ul: true, c: true, b: true, a: 1}, 'choose_b', be.if2_b);
    $$___a({ul: true, np: true, c: true, b: true, a: 1}, 'choose', be.if2_b);

    
    //cond_b: Maybe Node . [Behaviour boolean, Behaviour a] -> Behaviour a
    be.cond_b = function (maybeKeyNode /* . pairs */ ) {
        var pairs = x.slice(arguments, 1);

        return l.foldR(
            function (pair, accB) { 
                return be.if_b(maybeKeyNode, pair[0], pair[1], accB);
            },
            be.createConstantB(maybeKeyNode, undefined),
            pairs);     
    };
    $$___a({ul: true, c: true}, 'cond_b', be.cond_b);

    //TODO optionally append to objects
    //createConstantB: Maybe Node * a -> Behaviour a
    be.createConstantB = function (maybeKeyNode, val) 
    {
        return new be.Behaviour(
            maybeKeyNode, 
            c.createEventReceiver(maybeKeyNode), 
            val);
    };
    $$___a({ul: true, c: true}, 'constant_b', be.createConstantB);    
    
    be.lift_b = function (maybeKeyNode, fn /* . behaves */) 
    {
        if (!(fn instanceof be.Behaviour && be.valueNow(fn) instanceof Function) && !(fn instanceof Function)) {  throw 'lift_b: expected [behaviour] function as second arg'; } //SAFETY

        var behaves = x.slice(arguments, 2);
        if (arguments.length === 2) { behaves = []; } //TODO check necessity
        //TODO optimize using selectors
        for (var i = 0; i < behaves.length; i++) {
            if ( !(behaves[i] instanceof be.Behaviour)) {
                behaves[i] = be.createConstantB(maybeKeyNode, behaves[i]); 
            }
        }

        var fnB = (fn instanceof be.Behaviour)? 
            fn : be.createConstantB(maybeKeyNode, fn);
        
        var context = this;

        var res_e = 
            e.createNode(
                maybeKeyNode, 
                l.map(be.changes, fn instanceof be.Behaviour? behaves.concat([fn]) : behaves), 
                //better approach would be to generate the function using selectors
                function (s, p) {
                    p.value = be.valueNow(fnB).apply(context, l.map(be.valueNow, behaves));
            s(p);
                });

        return new be.Behaviour(
            maybeKeyNode, 
            res_e, 
            be.valueNow(fnB).apply(context, l.map(be.valueNow, behaves)));
    };
//  $$__cb('lift_b', be.lift_b);
//  $$__cb('map_b', be.lift_b);

    //topologically evaluated lift
    //TODO: should this be the default lift? if "if" is ever lifted, then yes
    be.lift2_b = function (maybeKeyNode, fn /* . behaves */)
    {

        var args = x.slice(arguments, 1);

        var constituentsE = 
            l.map(be.changes, 
                l.filter(function (v) { return v instanceof be.Behaviour; },
                    args));
                        
        var topologicalArgs =
            l.map(
                function (B) {
                    return B instanceof be.Behaviour?
                        be.hold(
                            maybeKeyNode,
                            e.createTopologicalNode(
                                maybeKeyNode,
                                e.raise_e(
                                    maybeKeyNode,
                                    be.changes(B),
                                    constituentsE)),
                            be.valueNow(B)) :
                        B;
                },
                args);
    
        return be.lift_b.apply(this, [maybeKeyNode].concat(topologicalArgs));
    };
    $$___a({ul: true, c: true, b: true, a: 2}, 'lift_b', be.lift2_b);
    $$___a({ul: true, np: true, c: true, b: true, a: 2}, 'lift', be.lift2_b);
    $$___a({ul: true, c: true, b: true, a: 2}, 'transform_b', be.lift2_b);
    $$___a({ul: true, np: true, c: true, b: true, a: 2}, 'transform', be.lift2_b);
    $$___a({ul: true, c: true, b: true, a: 1}, 'apply_b', be.lift2_b);

    be.arr_b = function (maybeKeyNode, fn) {
        //TODO really should compose key nodes
        return function (maybeKeyNode2) { 
            return be.lift_b.apply(this, [explicitContext !== true ? context : maybeKeyNode2].
                    concat(x.slice(arguments, 0)));
        };
    };

    be.genRec_b = function (maybeKeyNode, eventMakers, objMaker) {
        var receivers = [];
        var switches = [];  //switch of receiver
        for (var i = 0; i < eventMakers.length; i++) { 
            var r = c.createEventReceiver(maybeKeyNode);
            receivers.push(r);
            switches.push(c.switch_e(maybeKeyNode, r)); 
        }
        
        var resB = objMaker.apply(this, switches);
        var interceptE = 
            e.createNode(
                maybeKeyNode,
                [be.changes(resB)],
                function (_, p) {
                    for (var i = 0; i < receivers.length; i++) {
                        c.sendEvent(
                            receivers[i],
                            eventMakers[i](p.value));
                    }
                });
        c.sendEvent(interceptE, be.valueNow(resB)); //TODO manual thread?
        return resB;
    };
    
    //be.and_b: Maybe Node . Array (Behaviour boolean) -> Behaviour boolean
    be.and_b = function (maybeKeyNode /* . behaves */) 
    {
        //TODO abstract out
        var behaves = x.slice(arguments, 1);

        for (var i = 0; i < behaves.length; i++) {
            if (!(behaves[i] instanceof be.Behaviour)) {
                behaves[i] = be.createConstantB(maybeKeyNode, behaves[i]);
            }
        }
        
        return be.hold(
            maybeKeyNode,
            be.changes(
                l.foldR(
                    function (predB, accB) {
                        return be.if_b(maybeKeyNode, predB, accB, false);
                    },
                    be.createConstantB(maybeKeyNode, true),
                    behaves)),
            l.fold( 
                function (valB, acc) { return acc && be.valueNow(valB); },
                true,
                behaves));
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'and_b', be.and_b);
    $$___a({ul: true, np: true, c: true, b: true, a: 1}, 'and', be.and_b);
    
    be.or_b = function (maybeKeyNode /* . behaves */ )
    {
        //TODO abstract out
        var behaves = x.slice(arguments, 1);

        for (var i = 0; i < behaves.length; i++) {
            if (!(behaves[i] instanceof be.Behaviour)) {
                behaves[i] = be.createConstantB(maybeKeyNode, behaves[i]);
            }
        }
        
        return be.hold(
            maybeKeyNode,
            be.changes(
                l.fold(
                    function (predB, accB) {
                        return be.if_b(maybeKeyNode, predB, predB, accB);
                    },
                    be.createConstantB(maybeKeyNode, false),
                    behaves)),
            l.fold(
                function (predB, acc) { return acc || be.valueNow(predB); },
                false,
                behaves));              
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'or_b', be.or_b);
    $$___a({ul: true, np: true, c: true, b: true, a: 1}, 'or', be.or_b);

    be.not_b = function (maybeKeyNode, behave) 
    {
        if (!(behave instanceof be.Behaviour)) { throw 'not_b: expected Behaviour as second arg'; } //SAFETY

        return be.lift_b(maybeKeyNode, function (v) { return !v; }, behave);
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'not_b', be.not_b);
    $$___a({ul: true, np: true, c: true, b: true, a: 1}, 'not', be.not_b);
    
    
    //TODO E->B transform
    be.blind_b = function (maybeKeyNode, triggerB, interval) {
        return be.hold(
            maybeKeyNode, 
            c.blind_e(maybeKeyNode, be.changes(triggerB), interval),
            be.valueNow(triggerB));         
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'blind_b', be.blind_b);
    $$___a({ul: true, np: true, c: true, b: true, a: 1}, 'blind', be.blind_b);

    be.calm_b = function (maybeKeyNode, triggerB, interval) {
        return be.hold(
            maybeKeyNode, 
            c.calm_e(maybeKeyNode, be.changes(triggerB), interval),
            be.valueNow(triggerB));         
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'calm_b', be.blind_b);
    $$___a({ul: true, np: true, c: true, b: true, a: 1}, 'calm', be.blind_b);


    be.arrayB =  function (maybeKeyNode, init, event) {

        //TODO if init is undefined, getting weird display [undefined init]

        //====setup
        var aBox = {arr: init instanceof Array? x.slice(init, 0) : []};
        var r = c.createEventReceiver(maybeKeyNode); //mutations

        var resB = new be.Behaviour(
                maybeKeyNode, 
                event instanceof e.Node ? 
                    c.merge_e(
                        maybeKeyNode,
                        r, 
                        event) : r, 
                aBox.arr);

        //====functional interface

        //note that value change is propagated at merge above
        if (event instanceof e.Node) {
            c.lift_e(
                maybeKeyNode,
                function (arr) {
                    if (arr instanceof Array) {
                        aBox.arr = arr; 
                    } 
                    else { throw 'array_b: tried to set to value that is not an array'; } //SAFETY
                }, 
                event);
        }

        //====mutation interface                
        resB.mutationsE = r;

        var addWrite = 
            function (fnName) {
                if (aBox.arr[fnName]){
                    resB[fnName] = function () {
                        var args = x.slice(arguments, 0);
                        if (!(aBox.arr instanceof Array)) { throw ('previous to ' + fnName + ' arr not array');}
                        aBox.arr[fnName].apply(aBox.arr, args);
                        if (!(aBox.arr instanceof Array)) { throw ('post ' + fnName + ' arr not array');}
                        c.sendEvent(r, aBox.arr);
                    };
                }
            };

        var addRead = 
            function (propName) {
                if (aBox.arr[propName]){
                    resB[propName + 'B'] =
                        new be.Behaviour(
                                maybeKeyNode, 
                                c.lift_e(
                                    maybeKeyNode,
                                    function(_) {return aBox.arr[propName];},
                                    r),
                                aBox.arr[propName]);
                }
            };

        l.forEach(
                addWrite,
                ['push', 'pop', 'reverse', 'shift', 'slice', 'splice']);

        l.forEach(
                addRead,
                ['length']);

        //TODO REMOVE                
        resB.lengthB = be.lift_b(maybeKeyNode, function(_){return aBox.arr.length;}, resB);

        return resB;

    };
    $$___a({ul: true, c: true}, 'array_b', be.arrayB);


    //========== END BELONGS IN FSERVER.JS =====================================
    flapjax.dom = {
        //credit Scott Andrew
        //usage: flapjax.xlib.addEvent(myDomObj, "mouseover", event->void )
        //warning: do not use 'this' as meaning depends on browser (myDomObj vs window)
        //addEvent: Dom * String DomEventEnum * (DomEvent -> a) -> Void
        addEvent: function (obj, evType, fn) 
        {
        //TODO encode mouseleave evt, formalize new evt interface

        if (obj.addEventListener) {
            obj.addEventListener(evType, fn, false); //TODO true fails on Opera
            return true;
        } else if (obj.attachEvent) {
            //some reason original had code bloat here
            return obj.attachEvent("on"+evType, fn); 
        } else {
            return false; 
        }
        },

        //credit Dustin Diaz 
        //note: node/tag optional
        //getElementsByClass: Regexp CSSSelector * Dom * String DomNodeEnum -> Array Dom
        getElementsByClass: function (searchClass, node, tag) 
        {
        var classElements = [];
        if ( (node === null) || (node === undefined) ) { node = document; }
        if ( (tag === null) || (tag === undefined) ) { tag = '*'; }
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
        for (var i = 0, j = 0; i < elsLen; i++) {
            if ( pattern.test(els[i].className) ) {
            classElements.push(els[i]);
            }
        }
        return classElements;
        },

        //assumes IDs already preserved
        //swapDom: (Dom a U String) [* (Dom b U String)] -> Dom a
        swapDom: function(replaceMe, withMe) 
        {
        if ((replaceMe === null) || (replaceMe === undefined)) { throw ('swapDom: expected dom node or id, received: ' + replaceMe); } //SAFETY

        var replaceMeD = flapjax.dom.getObj(replaceMe);
        if (!(replaceMeD.nodeType > 0)) { throw ('swapDom expected a Dom node as first arg, received ' + replaceMeD); } //SAFETY

        if (withMe) {
            var withMeD = flapjax.dom.getObj(withMe);
            if (!(withMeD.nodeType > 0)) { throw 'swapDom: can only swap with a DOM object'; } //SAFETY
            try {
            replaceMeD.parentNode.replaceChild(withMeD, replaceMeD);
            } catch (e) {
            throw('swapDom error in replace call: withMeD: ' + withMeD + ', replaceMe Parent: ' + replaceMeD + ', ' + e + ', parent: ' + replaceMeD.parentNode);                    
            }
        } else {
            replaceMeD.parentNode.removeChild(replaceMeD); //TODO isolate child and set innerHTML to "" to avoid psuedo-leaks?
        }
        return replaceMeD;
        }, 

        //getObj: String U Dom -> Dom
        //throws 
        //  'getObj: expects a Dom obj or Dom id as first arg'
        //  'getObj: flapjax: cannot access object'
        //  'getObj: no obj to get
        //also known as '$'
        //TODO Maybe alternative?
        getObj: function (name) 
        {

        if (typeof(name) == 'object') { return name; }
        else if ((typeof(name) == 'null') || (typeof(name) == 'undefined')) {
            throw 'getObj: expects a Dom obj or Dom id as first arg';
        } else {

            var res = 
            document.getElementById ? document.getElementById(name) :
            document.all ? document.all[name] :
            document.layers ? document.layers[name] :
            (function(){ throw 'getObj: flapjax: cannot access object';})();
            if ((res === null) || (res === undefined)) { 
            throw ('getObj: no obj to get: ' + name); 
            }
            return res;
        }
        },

        //getObjs: . Array (String U Dom) ->  {String: Dom}
        //throw 'getObj: expects a Dom obj or Dom id as first arg';
        //also known as $O
        //TODO improve exn thrown
        getObjs: function( /* . ids */) 
        {
        var ids = arguments;
        var res = {};
        for (var i = 0; i < ids.length; i++) {
            res[ids[i]] = flapjax.dom.getObj(ids[i]);
        }
        return res;
        },

        // getLabeledObjs: 
        //      . Array( String U Array [String [*, String]]) 
        //      -> Obj{String: Dom}
        //throw 'getObj: expects a Dom obj or Dom id as first arg';
        // Pull out multiple dom objects by ID, optionally providing a label
        // Ex: getLabeledObjs('a', ['b'], ['c', 'd']) 
        //          -> {a: Dom Id a, b: Dom Id b, d: Dom Id c} 
        //also known as $L
        //TODO improve exn thrown
        getLabeledObjs: function( /* . idOptLabelAs */) 
        {
        var idOptLabelAs = arguments;
        var res = {};
        for (var i = 0; i < idOptLabelAs.length; i++) {
            var oid = 
            idOptLabelAs[i] instanceof Array ?
                ((idOptLabelAs[i].length === 1) ?
                idOptLabelAs[i][0] : idOptLabelAs[i][1]) :
                idOptLabelAs[i];
            res[oid] = 
            flapjax.dom.getObj(
                idOptLabelAs[i] instanceof Array? 
                idOptLabelAs[i][0] : idOptLabelAs[i]);
        }
        return res;
        },

        // getObjsA:  (Array String ) U (. Array String) -> Array Dom
        //throw 'getObj: expects a Dom obj or Dom id as first arg';
        // Ex: getObjsA('x', 'y', 'z') -> [Dom x, Dom y, Dom z]
        // Ex: getObjsA(['x', 'y', 'z']) -> [Dom x, Dom y, Domz]
        //also known as $A
        //TODO improve exn thrown
        getObjsA: function( id /* . ids */) 
        {
        var ids = id instanceof Array? id : arguments;
        var res = [];
        for (var i = 0; i < ids.length; i++) {
            res.push(flapjax.dom.getObj(ids[i]));
        }
        return res;
        }

    };
    d = flapjax.dom;
    for (var iij in flapjax.dom) { $$___a({}, iij, flapjax.dom[iij]); }
    $$___a({}, '$$', d.getElementsByClass);
    $$___a({}, '$',  d.getObj);
    $$___a({}, '$A', d.getObjsA);
    $$___a({}, '$O',  d.getObjs);
    $$___a({}, '$L', d.getLabeledObjs);

    
    //topE: Event alpha
    //alerts whenever an inserted dom changes
    d.topE = c.createEventReceiver(b.maybeEmpty); 
    $$___a({ul: true}, 'topE', d.topE);

    //helper to reduce obj look ups
    //getDynObj: domNode . Array (id) -> domObj
    //obj * [] ->  obj
    //obj * ['position'] ->  obj
    //obj * ['style', 'color'] ->  obj.style
    d.getMostDom = function (domObj, indices)
    {
        var acc = d.getObj(domObj);
        if ( (indices === null) ||
             (indices === undefined) ||
             (indices.length < 1)) {
            return acc;
        } else {
            for (var i = 0; i < indices.length - 1; i++) {
                acc = acc[indices[i]];
            }
            return acc;
        }       
    };
//  $$___a({}, 'getMostDom', d.getMostDom);

    d.getDomVal = function (domObj, indices) 
    {
        var val = d.getMostDom(domObj, indices);
        if (indices && indices.length > 0) {
            val = val[indices[indices.length - 1]];
        }
        return val;
    };
//  $$___a({}, 'getDomVal', d.getDomVal);
    
    //original credit MochiKit
    //TODO allows rhs of behaviour.. recursion of rhs behaviour may be weird for collections
    //updateTree: Dom a . Array (obj) -> Dom 
    d.updateTree = function (self /* . obj ...*/) 
    {
        var updater = arguments.callee;
        if (self === null) {
            self = {};
        }
        for (var i = 1; i < arguments.length; i++) {
            var o = arguments[i];
            if (o instanceof be.Behaviour) {
                e.createNode(
                    b.maybeEmpty,
                    [be.changes(o)],
                    function (_, p) {
                        updater(self, p.value);
                    });
                o = be.valueNow(o);
            }
            if (typeof(o) != 'undefined' && o !== null) {
                for (var k in o) { //TODO guard against obj inheritance?                    
                    (function (kk) {
                        var v = o[kk];
                        if (typeof(self[kk]) == 'object' && typeof(v) == 'object') {
                            updater(self[kk], v);
                        } else if (v instanceof be.Behaviour) {
                            e.createNode(
                                b.maybeEmpty,
                                [be.changes(v)],
                                function (_, p) {
                                    var newObj = {};
                                    newObj[kk] = p.value;
                                    updater(self, newObj);
                                });
                            self[kk] = be.valueNow(v);
                        } else {
                            self[kk] = v;
                        }
                    })(k);
                }
            }
        }
        return self;
    };
    
    //setStyle: Maybe Event * Dom * Array [Behavior] {key: [Behaviour] value, ...} -> void
    d.setStyle = function (maybeKeyNode, tagD, attribs)
    {
        if (!(attribs instanceof Array)) { throw 'setStyle: expected Array as second arg'; } //SAFETY

        l.forEach(
            function (kvOrB) {
                d.updateTree(tagD, kvOrB);
            },
            attribs);   
    };
    
    d.removeDependencies = function (hooks) {
        for (var i = hooks.length - 1; i > -1; i--) {
            e.removeListenerNode(
                hooks[i].from,
                hooks[i].towards);
            hooks.pop();
        }
    };
        
    d.objToTag = function (o) {
        var oV = o instanceof be.Behaviour? be.valueNow(o) : o;
        return typeof(oV) == 'object'?
            (oV.nodeType > 0 ? oV : document.createTextNode(oV)) :
            document.createTextNode(oV);            
    };
    
    //repopulate: Maybe Event 
    //      * Dom 
    //      * [Behaviour] [Array] [Behaviour] Dom U string
    //      * Array {from: Node, towards: Node} 
    //      -> Void
    //add (dynamic) nodes to a tag, treating the array as static
    d.repopulate = function (maybeKeyNode, currentTag, children, oldChildrenHooks, receiver) 
    {
        var parentD = currentTag.getTag();
        if (!(parentD.nodeType > 0)) { throw 'repopulate: expected dom as second arg'; } //SAFETY
//      if (!((children instanceof Array) 
//            || ((children instanceof be.Behaviour) && (be.valueNow(children) instanceof Array)))) { 
//          throw 'repopulate: expected [Behaviour] Array dom as third arg'; } //SAFETY
        if (!(oldChildrenHooks instanceof Array)) { throw 'repopulate: expected Array as fourth arg'; } //SAFETY

        parentD.innerHTML = ""; //TODO check 1/11/07 - leo
        //while ( parentD.hasChildNodes() ) { parentD.removeChild(parentD.firstChild); } //TODO isolate child and set innerHTML to "" to avoid psuedo-leaks?
        d.removeDependencies(oldChildrenHooks); //TODO might be redundant call between here & TagMaker
        
        if (!(children instanceof Array)) { children = [children]; }
        
        l.forEach(
            function (child) {
                if (!(child === undefined) &&
                    !(child === null) &&
                    !(child instanceof be.Behaviour &&
                        ((be.valueNow(child) === null) ||
                            (be.valueNow(child) === undefined)))) {
            
                    var childV = child instanceof be.Behaviour? be.valueNow(child) : child;                 
                    var tagD;   //needed for behaviour switching
                    if (!(childV instanceof Array)) {

                        //NOW
                        tagD = d.objToTag(childV);
                        parentD.appendChild(tagD); 
                        
                        //LATER
                        if (child instanceof be.Behaviour) {
                            oldChildrenHooks.push(
                                {from: be.changes(child),
                                 towards: e.createNode(
                                    maybeKeyNode,
                                    [be.changes(child)],
                                    function (_, p) {
                                        var newD = d.objToTag(p.value);
                                        if (!tagD || p.value instanceof Array ||
                                            (p.value instanceof be.Behaviour &&
                                                be.valueNow(p.value) instanceof Array)) {
                                                d.repopulate(
                                                    maybeKeyNode, 
                                                    currentTag, 
                                                    children, 
                                                    oldChildrenHooks, 
                                                    receiver);
                                                c.sendEvent(receiver, currentTag.getTag());                                     
                                        } else {
                                            d.swapDom(tagD, newD);
                                            tagD = newD;
                                        }                                   
                                    })});                               
                        }

                    } else {                    
                        //collection changes
                        if (child instanceof be.Behaviour) {
                            oldChildrenHooks.push(
                                {from: be.changes(child),
                                 towards: e.createNode(
                                        maybeKeyNode,
                                        [be.changes(child)],
                                        function (_, p) {
                                            d.repopulate(
                                                maybeKeyNode, 
                                                currentTag, 
                                                children, 
                                                oldChildrenHooks,
                                                receiver);
                                            c.sendEvent(receiver, currentTag.getTag());                                     
                                        })});
                        }
                        
                        //entry in collection changes
                        l.forEach( // cV is an array
                            function (arrayEntry) {
                                var arrayEntryV =
                                    arrayEntry instanceof be.Behaviour? 
                                        be.valueNow(arrayEntry) : arrayEntry;                   
                                var entryD = d.objToTag(arrayEntryV);
                                currentTag.getTag().appendChild(entryD);
                                if (arrayEntry instanceof be.Behaviour) {
                                    oldChildrenHooks.push(
                                        {from: be.changes(arrayEntry),
                                         towards: e.createNode(
                                                maybeKeyNode,
                                                [be.changes(arrayEntry)],
                                                function (_, p) {
                                                //TODO ignore case of behaviour (switch) / array for now..
                                                    var newD = d.objToTag(p.value);
                                                    d.swapDom(entryD, newD);
                                                    entryD = newD;
                                                })});                               
                                }
                            },
                            childV);
                    }

                }
            },
            children);
    };
    
    d.enstyleProperty = function (maybeKeyNode, handler, obj, vals, i) {
    
        if (vals[i] instanceof be.Behaviour) {
            if (typeof(be.valueNow(vals[i])) == 'object') {
                d.enstyle(maybeKeyNode, handler, obj[i], vals[i]);
            } else {
                obj[i] = be.valueNow(vals[i]);
                e.createNode(
                    maybeKeyNode,
                    [be.changes(vals[i])],
                    (function (ii) {
                return function (_, p) { obj[ii] = p.value; };
                    })(i));
            }
        } else {
            if (typeof(vals[i]) == 'object') {
                d.enstyle(maybeKeyNode, handler, obj[i], vals[i]);
            } else {
                    obj[i] = vals[i];
            }
        }
    };
    
    
    //enstyle: Maybe Event 
    //      * {reconstructTag: -> Void, //on collection change 
    //         recordHook: Event * Event -> Void}
    //      * {key: value, ...}
    //      * [Behaviour] {key: [Behaviour] valueRec, ...}
    //      -> Void
    //
    d.enstyle = function (maybeKeyNode, handler, obj, vals) {
        if (!(typeof(handler) == 'object')) { throw 'enstyle: expected Object as second arg'; } //SAFETY
        if (!(handler.reconstructTag instanceof Function)) { throw 'enstyle: expected {reconstructTag: void -> void, ... } as second arg'; } //SAFETY
        if (!(handler.recordHook instanceof Function)) { throw 'enstyle: expected {recordHook: Event * Event -> void, ... } as second arg'; } //SAFETY
        if (!(typeof(obj) == 'object')) {throw ('enstyle: expected object as third arg, received: ' + obj); } //SAFETY
        if ((!(vals instanceof be.Behaviour && (typeof(be.valueNow(vals)) == 'object'))) &&
            (!(typeof(vals) == 'object'))) { throw ('enstyle: expected [Behaviour] object as fourth val of enstyle, received: '  + vals); } //SAFETY

        //build & record hook if dynamic collection
        if (vals instanceof be.Behaviour) {
            if (!(typeof(be.valueNow(vals)) == 'object')) { throw 'enstyle: expected object literal as behaviour value'; } //SAFETY
            handler.recordHook(
                be.changes(vals),
                e.createNode(
                    maybeKeyNode,
                    [be.changes(vals)],
                    function (_, __) {
                        handler.reconstructTag();
                    }));
        }
        
        var valsV = vals instanceof be.Behaviour ? be.valueNow(vals) : vals;
        
        if (typeof(valsV) == 'object') { //TODO ignore proto properties?
            for (var i in valsV) {
                if (!(Object.prototype) || !(Object.prototype[i])) {
                    d.enstyleProperty(maybeKeyNode, handler, obj, valsV, i);    
                }
            }       
        } 
        else { throw 'enstyle: expected object literals'; } //SAFETY

    };
    
    //isEqualNodes :: DOM * DOM U String -> Boolean
    //True iff first text node and second text with same value or just same value, 
    //   or both nodes with same ref
    d.isEqualNodes = function (n1, n2) {
        if (n1 == n2) { return true; } //fast exit
        if (typeof(n1) == 'object' && n1.nodeType == 3) {
            if (typeof(n2) == 'object') {
                return (n2.nodeType == 3 && l.isEqual(n2.nodeValue, n1.nodeValue));
            } else if (n2 == undefined && n1.nodeValue == '') { 
                return true; 
            } else if (l.isEqual(n1.nodeValue, n2)) {  //string, number
                return true; 
            } else {
                return false;
            }             
        } else { 
            return l.isEqual(n1, n2);
        }
    };
    
    d.quickNode = function (e) { 
        if ((typeof(e) == 'object') && (e.nodeType)) { /*console.log('continuing node: ' + e);*/ return e; }
        else if ( e === undefined || e === null) { 
            //console.log('making empty text node for: ' + e);
            return document.createTextNode(''); 
        } else /* if ( typeof(e) == 'string'  || typeof(e) == 'number')*/ { 
            //console.log('making full textnode: ' + e);
            return document.createTextNode(e); 
        } /*else {
            throw ('quickNode: Unknown input type: ' + typeof(e) + ', ' + e); //SAFETY
        }*/
    };
    
    
    // Array [[Behaviour] Object *] [[Behaviour] Array] [Behaviour] Dom U String U undefined
    //   --> {attribs: Array [Behaviour] Object, arrs: Array [Behaviour] Array [Behaviour] Dom }
    // split an arguments array into:
    //   1. arrs: (coalesced, and possibly time varying) arrays of dom objects 
    //   2. attribs: attribute objects
    d.extractParameters = function (args) {
    
        var arrs = [];
        var attribs = [];
    
        var curarr = [];
        arrs.push(curarr);
        for (var i = 0; i < args.length; i++) {
            if (args[i] instanceof be.Behaviour) {
                var vn = be.valueNow(args[i]);
                if (vn instanceof Array) {          
                    arrs.push(args[i]);
                    curarr = [];
                    arrs.push(curarr);
                } else {
                    if ( ((typeof(vn) == 'object') && (vn.nodeType == 1)) ) {
                            curarr.push(args[i]);
                    } else if (
                            (typeof(vn) == 'string') || (typeof(vn)=='number') || (typeof(vn)=='boolean') || (vn == undefined)) {
                            curarr.push(args[i]);
                    } else if (typeof(vn) == 'object') {
                        attribs.push(args[i]);
                    }
                    else { throw ('extractParameters for tag: unknown behaviour argument argument ' + i + ', type: ' + typeof(vn)); } //SAFETY
                }
            } else {
                if (args[i] instanceof Array) {
                    var arr = args[i];
                    for (var j = 0; j < arr.length; j++) { curarr.push(arr[j]); }
                } else {
                    var vn = args[i];
                    if ( ((typeof(vn) == 'object') && (vn.nodeType == 1)) ||
                     (typeof(vn) == 'string') || (typeof(vn)=='number') || (vn == undefined)) {
                        curarr.push(args[i]);
                    } else if (typeof(vn) == 'object') {
                        attribs.push(args[i]);
                    }
                    else { throw ('extractParameters for tag: unknown behaviour argument argument ' + i + ', type: ' + typeof(vn)); } //SAFETY
                }
            }
        };
        
        return {arrs: arrs, attribs: attribs};    
    };
    
       
    // createDependentNode :: [Behaviour] String U Dom * (Dom ->) -> {removeDependency: -> , domNode: DOM}
    // change to a dom node will cause a swap in parent and update of result node
    // invoking corresponding dependency func will break the dependency.
    // when given a flat value, just return a thunk and original dom node
    d.createDependentNode = function (maybeKeyNode, domNode, notify) {

        var vn = domNode instanceof be.Behaviour ? be.valueNow(domNode) : domNode;
        var res = {domNode: d.quickNode(vn), removeDependency: l.identity};

        if (domNode instanceof be.Behaviour) {
            var isText = typeof(be.valueNow(domNode)) == 'number' || typeof(be.valueNow(domNode)) == 'string' || typeof(be.valueNow(domNode)=='boolean');
            //console.log(be.valueNow(domNode).nodeType + ', ' + be.valueNow(domNode).nodeValue);
            var prev = isText ? be.valueNow(domNode).nodeValue : be.valueNow(domNode);
            res.removeDependency = (function (eventNode) {
                    return function () { 
                        e.removeListenerNode(be.changes(domNode), eventNode); };
                    })(e.createNode(
                            maybeKeyNode,
                            [be.changes(domNode)], 
                            function (s, p) {
                                if (isText) {
                                    if (l.isEqual(prev, p.value)) {}
                                    else {
                                        prev = p.value; 
                                        res.domNode.nodeValue = prev;
                                    }
                                } else {
                                    if (l.isEqual(prev, p.value)) {}
                                    else {
                                        prev = p.value;
                                        d.swapDom(res.domNode, prev);
                                        res.domNode = prev;
                                    }
                                }
                                notify(res.domNode);
                            }));
        }       
        return res;
    };
        
    
    //flat array, current fence post, and parent notification function
    // Array [Behaviour] String U Dom * {nextChild, firstChild} * (Dom ->) -> Array {domNode: DOM, removeDependency: ->}
    d.createDependentNodes = function (maybeKeyNode, arr, fencePost, propagate) {
        var dependentNodes = [];
        if (arr[0]) { 
            var o = d.createDependentNode(
                maybeKeyNode,
                arr[0], 
                function (domNode) {fencePost.firstChild = domNode; propagate(); });
            fencePost.firstChild = o.domNode;
            dependentNodes.push(o);
        }               
        for (var j = 1; j < arr.length; j++) {
            dependentNodes.push(d.createDependentNode(maybeKeyNode, arr[j], propagate));
        }
        return dependentNodes;
    };

    //insertChildreNodes :: {val: DOM} * Array [Behaviour] Array [Behaviour] Dom U String * Event DOM
    //insert (arrays of) children nodes in arrs into the current tag
    //when they change, update them, and notify resE of the currentTag.val
    //most operations work on siblings, but need currentTag.val in case no right sibling (elt.append)
    //  and because orthogonal change in style may cause parent node reconstruction
    d.insertChildrenNodes = function (maybeKeyNode, currentTag, arrs, resE) {
    
        var fids = 0;
    

        //console.log('insertChildrenNodes');

        var propagate = function () { c.sendEvent(resE, currentTag.val); };

        //fill tag
        //if a time varying node changes, make swap
        //if a time varying array changes, remove minimal # of dependecies and insert new dependencies/nodes
        var fencePost = {nextPost: undefined, firstChild: undefined, fid: fids}; // so can add rightmost elements by post traversal
        var firstPost = fencePost;
        for (var i = 0; i < arrs.length; i++) {
            var arr = arrs[i];
            var thisPost = {nextPost: undefined, firstChild: undefined, fid: fids++};
            fencePost.nextPost = thisPost;
            fencePost = fencePost.nextPost;
           // console.log('**********next fencepost!!***********');
            //console.log('thisPost.fid: ' + thisPost.fid);
            
            if (arr instanceof Array) {  // CASE 1: static array
               // console.log('static array');
                var dependentNodes = d.createDependentNodes(maybeKeyNode, arr, thisPost, propagate);
                for (var j = 0; j < dependentNodes.length; j++) {
                    //console.log('appending node: ' + dependentNodes[j].domNode + ', ' + dependentNodes[j].domNode.nodeValue);
                    currentTag.val.appendChild(dependentNodes[j].domNode);
                }
                //console.log('created thisPost.firstChild? ' + thisPost.firstChild);
            } else if (arr instanceof be.Behaviour) { // CASE 2: time varying array
                //console.log('dynamic array');
                var last = x.slice(be.valueNow(arr), 0);
                //console.log('last init: ' + map(function(v){return '[[' + typeof(v) + ' ' + v + ']]';}, last));                
                var lastDependencies = d.createDependentNodes(maybeKeyNode, last, thisPost, propagate);
                //console.log('created thisPost.firstChild? ' + thisPost.firstChild);
                //console.log('dep len: ' + lastDependencies.length);
               // console.log('remove dep: ' + map(function (v) { return '[[' + v.removeDependency + ']]'; }, lastDependencies));
                for (var j = 0; j < lastDependencies.length; j++) {
                    currentTag.val.appendChild(lastDependencies[j].domNode);
                }
            
                //TODO swap parent with dummy and reinsert after changes
                /*splice labeling 012345678    0   12345678   012    345678   01234    123  
                                  *********    *   ********   ***    ******   *****    ***
                                    ooo****    *ooo********   **oooooo*****   ****oooooooo
                     startSame   0            1>             2>>             4>>>>
                     endSame     4     <<<<   8    <<<<<<<<  5        <<<<<  0                    */

                e.createNode(maybeKeyNode,
                    [be.changes(arr)],
                    (function (thisPost, last, lastDependencies) {
                    
                    return function (s, p) {
                        //console.log('*********dynamic array change*********');
                        var na = p.value; // "next array"
                        var maxlen = Math.min(last.length, na.length);
                        var startSame = 0; var endSame = 0;

                        for (var j = 0; j < maxlen && d.isEqualNodes(last[j],na[j]); j++) {
                            startSame++; //how many are same in the beginning
                        }
                    
                        if ((startSame == last.length) && (startSame == na.length)) { 
                            //nothing changed
                        } else {
                    
                            for (var j = 0; j < maxlen && d.isEqualNodes(last[last.length - 1 - j], na[na.length - 1- j]); j++) {
                                endSame++;  //how many are same in the end
                            }

                            //console.log('lastlen: ' + last.length + ', dep len: ' + lastDependencies.length);
                            for (var j = startSame; j < last.length - endSame; j++) {
                                var dn = lastDependencies[j].domNode;
                                dn.parentNode.removeChild(dn);
                                //console.log('removeDependency ' + j + ': ' + lastDependencies[j].removeDependency);
                                lastDependencies[j].removeDependency(); //stop listening for updates on removed element
                            }
                                        
                            var newDependencies = d.createDependentNodes(
                                    maybeKeyNode,
                                    x.slice(na, startSame, na.length - startSame - endSame), 
                                    startSame == 0 ? thisPost : {}, 
                                    propagate);
                                    
                            //console.log('num last items: ' + lastDependencies.length + ', num new items: ' + newDependencies.length);         

                            lastDependencies.splice.apply(lastDependencies, 
                                    [startSame, last.length - startSame - endSame].concat(newDependencies));

                //console.log('splice: ' + startSame + ', ' + (last.length - startSame - endSame));
                //console.log('end len: ' + lastDependencies.length);


                            //additions to parent DOM node using insertBefore
                            if (newDependencies.length > 0) {
                                var rightOfInsert = null;
                                if (endSame > 0) { 
                                    //console.log('have an endpoint: ' + endSame );
                                    rightOfInsert = lastDependencies[lastDependencies.length - 1 - endSame].domNode;
                                } else {
                                    //console.log('tracing fenceposts starting from: ' + thisPost.fid);
                                    var next = thisPost.nextPost;
                                    //console.log('...looking at ' + (next ? next.fid : 'end'));
                                    while (next && !next.firstChild && next.nextPost) { 
                                        next = next.nextPost; 
                                        //console.log('...traverse again: ' + next ? next.fid : 'end');
                                    }
                                    if (next) { 
                                        //console.log('use firstChild: ' + next.firstChild);
                                        rightOfInsert = next.firstChild; 
                                    }
                                    //console.log('rightmost: ' + rightOfInsert);
                                }
                                
                                for (var j = newDependencies.length - 1; j >= 0; j--) {
                                    //console.log('rightOfInsert: ' + rightOfInsert);
                                    rightOfInsert = 
                                        currentTag.val.insertBefore( 
                                            newDependencies[j].domNode, 
                                            rightOfInsert); //null signifies an append
                                }
                            }

                            last = x.slice(na, 0);
                    //console.log('last init: ' + map(function(v){return '[[' + typeof(v) + ' ' + v + ']]';}, last));
                            //console.log('dep len: ' + lastDependencies.length);
                            //console.log('remove dep: ' + map(function (v) { return '[[' + v.removeDependency + ']]'; }, lastDependencies));

                        }
                        propagate();
                    };})(thisPost, last, lastDependencies)); // I hate JavaScript
            } 
            else { throw ('createParameterizedTagB: ' + tagName + ', incorrect partitioning!'); } //SAFETY
        }
    };


    d.createParameterizedTagB = function (maybeKeyNode, tagName)
    {    
        //console.log('making tag: ' + tagName);
        var resE = c.createEventReceiver(maybeKeyNode);
        var currentTag = {val: document.createElement(tagName) };

        //partition parameters into DOM arrays and attribute arrays
        var o = d.extractParameters(x.slice(arguments, 2));
        var attribs = o.attribs; //:: Array [Behaviour] Object //throw error for now if more than one
        if (attribs.length > 1) { throw ('createParameterizedTagB ' + tagName + ': more than one attribute (' + attribs.length + ')'); }
        var arrs = o.arrs; //:: Array [Behaviour] Array [Behaviour] Dom
        attribs = attribs.length > 0 ? attribs[0] : {};
        //console.log('array partition len: ' + arrs.length + ', attribs len: ' + o.attribs.length);
        //console.log(map(function (arr) { return arr.length; }, arrs));

        d.insertChildrenNodes(maybeKeyNode, currentTag, arrs, resE); //insert children time varyingly
        
        //enstyle tag
        var styleHooks = []; //from dynamic collections, break on reconstruction
        var recordHook = function (from, towards) { styleHooks.push({from: from, towards: towards}); };
        d.enstyle(
                maybeKeyNode,
                {
                    reconstructTag: //called when an attribute collection changes
                    function () {
                        d.removeDependencies(styleHooks);
                        var oldTag = currentTag.val;
                        currentTag.val = document.createElement(tagName);
                        while (oldTag.firstChild) {
                            currentTag.val.appendChild(oldTag.removeChild(oldTag.firstChild));
                        }
                        d.enstyle(
                            maybeKeyNode, 
                            {
                                reconstructTag: arguments.callee,
                                recordHook: recordHook
                            },
                            currentTag.val,
                            attribs);
                        c.sendEvent(resE, currentTag.val);
                    },
                    recordHook: recordHook
                },
                currentTag.val, //recur on this
                attribs);  //recur on this
 
        return be.hold(maybeKeyNode, resE, currentTag.val);
    
    };
    
    //createTagMaker: 
    //      String a
    //      -> 
    //      (Maybe Event 
    //      * undefined | [Behaviour] Array [Behaviour] {key: [Behaviour] recValue}
    //      * ( undefined | [Behaviour] Array [Behaviour] Dom a
    //          U . Array [Behaviour] Dom a)
    //      -> Behaviour Dom)
    d.createTagMaker = function (tagName)
    {
        //<tagName>B: Maybe Event 
        //      [* undefined | [Behaviour] Array [Behaviour] {key: [Behaviour] recValue}]
        //      * undefined | [Behaviour] Array [Behaviour] Dom
        //      -> Behaviour Dom
        return function (maybeKeyNode) {
            //partition input into attributes/children/reactive children
            var children = [];
            if (arguments[1] === null || arguments[1] === undefined) { arguments[1] = {}; }
            var attribs = [];
            for (var i = 1; i < arguments.length; i++) {
                if ((arguments[i] instanceof Array) ||
                    ((typeof(arguments[i]) == 'object') && 
                     (arguments[i].nodeType == 1))) {
                    
                    children.push(arguments[i]);

                } else if (arguments[i] instanceof be.Behaviour) {
                    var curIV = be.valueNow(arguments[i]);
                    if ((curIV instanceof Array) ||
                        ((typeof(curIV) == 'object') && 
                         (curIV.nodeType == 1)) ||
                        (typeof(curIV) == 'string')) {                      
                        children.push(arguments[i]);
                    } else if (typeof(curIV) == 'object') {
                        attribs.push(arguments[i]);
                    } else {
                        children.push(arguments[i]);
                    }
                } else if (typeof(arguments[i]) == 'object') {
                    attribs.push(arguments[i]);
                } else {
                    children.push(document.createTextNode(arguments[i]));                   
                }
            }

            if (attribs.length === 0) { attribs = {}; }
            else if (attribs.length == 1) { attribs = attribs[0]; }
            else { 
                throw (tagName + 'B: multiple arguments matched attribute form'); 
            }
            
            var currentTag = {tag: document.createElement(tagName) };
            currentTag.getTag = function () { return currentTag.tag; };
            currentTag.setTag = function (v) { currentTag.tag = v; };
            
            var receiverE = c.createEventReceiver(maybeKeyNode);

            var childrenHooks = []; // {from: Node dom, towards: Node mutator}
            //should always be able to remove these and reconstruct from children

            //========== CHILDREN
            //fills childrenHooks for current children
            d.repopulate(maybeKeyNode, currentTag, children, childrenHooks, receiverE);     

            //=========== ATTRIBUTES
            var styleHooks = []; //from dynamic collections, break on reconstruction
            var recordHook = function (from, towards) { styleHooks.push({from: from, towards: towards}); };
            d.enstyle(
                maybeKeyNode,
                {
                    reconstructTag: //called when an attribute collection changes
                                    //TODO keep child behaves, copying child nodes to new dom node
                        function () {
                            d.removeDependencies(styleHooks);
                            currentTag.setTag(document.createElement(tagName));
                            d.repopulate(
                                maybeKeyNode, 
                                currentTag, 
                                children, 
                                childrenHooks,
                                receiverE);                                 
                            d.enstyle(
                                maybeKeyNode, 
                                {
                                    reconstructTag: arguments.callee,
                                    recordHook: recordHook
                                },
                                currentTag.getTag(),
                                attribs);
                            c.sendEvent(receiverE, currentTag.getTag());
                        },
                    recordHook: recordHook
                },
                currentTag.getTag(), //recur on this
                attribs);  //recur on this
                
            return be.hold(
                maybeKeyNode,
                receiverE,
                currentTag.getTag());
        };
    };

    d.enstyleStaticProperty = function (obj, props, index, oCache) {
        if (typeof(props[index]) == 'object') {
            try {
                obj[index] = {};
            } catch (_) { }
            for (var i in props[index]) {
                if (!(Object.prototype) || !(Object.prototype[i])) {
                    d.enstyleStaticProperty(obj[index], props[index], i, oCache);
                }
            }
        } else {
            obj[index] = props[index];
        }
    };
    
    d.staticTagMaker = function (tagName) {
    
        return function () {

            var tagD = document.createElement(tagName);
            if (!(tagD.nodeType > 0)) { throw (tagName + ': invalid tag name'); } //SAFETY
        
            //partition input

//          if (arguments[1] === null || arguments[1] === undefined) { arguments[1] = {}; }
            var attribs = [];
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] instanceof Array) {
                    for (var j = 0; j < arguments[i].length; j++) {
                        if (arguments[i][j]) {
                            tagD.appendChild(
                                    (typeof(arguments[i][j]) == 'object' &&
                                     arguments[i][j].nodeType > 0)?
                                    arguments[i][j] :
                                    document.createTextNode(arguments[i][j]));
                        }
                    }
                } else if (!arguments[i]) {
                    //ignore
                } else if ((typeof(arguments[i]) == 'object') && 
                     (arguments[i].nodeType > 0)) {
                    tagD.appendChild(arguments[i]);
                } else if (typeof(arguments[i]) == 'object') {
                    attribs.push(arguments[i]);
                } else {
                    tagD.appendChild(document.createTextNode(arguments[i]));                    
                }
            }

            if (attribs.length == 1) { 
            
                for (var k in attribs[0]) {
                    if (!(Object.prototype) || !(Object.prototype[k])) {
                        d.enstyleStaticProperty(tagD, attribs[0], k);   
                    }
                }

            } else if (attribs.length >  0) { 
                throw 'static enstyle: expected object literals'; //SAFETY
            } /* else {
                alert('no attribs on: ' + tagName);
            } */
            
    
            return tagD;
        };
    };

    
    
    var generatedTags = 
        [ "a", "b", "br", "button", "canvas", "div", "embed", "fieldset", 
          "form", "font", "h1", "h2", "h3", "hr", "i", "img", "iframe", "input", 
          "label", "legend", "li", "object", "ol", "optgroup", "option",
          "p", "param", "pre", "select", "span", "strong", "table", "tbody", 
          "td", "textarea", "tfoot", "th", "thead", "tr", "tt", "ul" ];

    l.forEach(
        function (tagName) { 

            var upper = tagName.toUpperCase();

            //d.<TAG>B
            d[upper + 'B'] = function (maybeKeyNode) { 
                return d.createParameterizedTagB.apply(this, [maybeKeyNode, tagName].concat(x.slice(arguments, 1)));
                };           
            //d[upper + 'B'] = d.createTagMaker(tagName); 
            $$___a({ul: true, c: true}, upper + 'B', d[upper + 'B']);

            //d.<TAG>
            d[upper] = d.staticTagMaker(tagName);  //faster, simple
/*              function () {
                    // 8/16/06 - leo - arguments bug
                    // more forgiving: allows reactive children (just doesn't propagate them)
                    var args = [b.maybeEmpty].concat(x.slice(arguments, 0)); 
                    return be.valueNow(d[upper + 'B'].apply(this, args));
                }; */
            $$___a({}, upper, d[upper]);
        },
        generatedTags);

    //TEXTB: Maybe Event * Behaviour a -> Behaviour Dom TextNode    
    d.TEXTB = function (maybeKeyNode, strB)
    {
//      if (!(strB instanceof be.Behaviour || typeof(strB) == 'string')) { throw 'TEXTB: expected Behaviour as second arg'; } //SAFETY
        if (!(strB instanceof be.Behaviour)) { strB = be.createConstantB(maybeKeyNode, strB); }
    
        return be.hold(
            maybeKeyNode,
            c.map_ev(maybeKeyNode,
                function (txt) { return document.createTextNode(txt); },
                be.changes(strB)),
            document.createTextNode(be.valueNow(strB)));
    };
    $$___a({ul: true, c: true}, 'TEXTB', d.TEXTB);
    
    d.TEXT = function (strB) {
        return be.valueNow(d.TEXTB(b.maybeEmpty, strB));
    };
    $$___a({}, 'TEXT', d.TEXT);
    
    
    //tagRec: Maybe Event * Array (EventName a) * 
    //      ( .Array (Event a) * Array (Event a) -> Behaviour Dom) -> Behaviour Dom
    //note: does not need to reconstruct if dom node did not change
    d.tagRec = function (maybeKeyNode, eventNames, maker)
    {
        if (!(eventNames instanceof Array)) { throw 'tagRec: expected array of event names as second arg'; } //SAFETY
        if (!(maker instanceof Function)) { throw 'tagRec: expected function as third arg'; } //SAFETY

        var namedA = [];
        var receiversAEE = []; 

        var switches =
            l.map(
                function (eventName) {
                    receiversAEE[eventName] = c.createEventReceiver(maybeKeyNode);
                    namedA[eventName] = c.switch_e(maybeKeyNode, receiversAEE[eventName]);
                    return namedA[eventName];
                },
                eventNames);
                
        var resB = maker.apply(this, switches);
        var prev = undefined; 
        var interceptE = 
            e.createNode(
                maybeKeyNode,
                [be.changes(resB)],
                function (_, p) {
                    if (!l.isEqual(p.value, prev)) {
                        prev = p.value;
                        for (var i = 0; i < eventNames.length; i++) {
                            c.sendEvent(
                                receiversAEE[eventNames[i]],
                                d.extractEvent_e(maybeKeyNode, p.value, eventNames[i]));
                        }
                    }
                });
        c.sendEvent(interceptE, be.valueNow(resB)); //TODO manual thread?
        return resB;
    };
    $$___a({ul: true, c: true}, 'tagRec', d.tagRec);
    $$___a({ul: true, c: true}, 'nodeWithOwnEvents', d.tagRec);
    
    
    d.eventCounter = 0;
    d.getEventName = function (domObj)
    {
        var id = null;
        try {
            id = domObj.getAttribute('id');
        } catch (exn) {}
        if ( (id === null) || (id === undefined) || (id.length < 1)) {
            id = 'flapjaxDomEvent' + d.eventCounter++;
            domObj.id = id; //TODO check
        }
        return id;
    };
    
    d.domEvents = [];
    
    //extractEventStatic_e: Maybe Event * Dom * String -> Event
    d.extractEventStatic_e = function (maybeKeyNode, domObj, eventName) 
    {
        domObj = d.getObj(domObj);
        var id = d.getEventName(domObj);
        
        if ((eventName === undefined) || (eventName === null)) { throw 'extractEvent_e: no evt name specified as third arg'; }

        if (!d.domEvents[id]) { d.domEvents[id] = []; }
        
        if (!d.domEvents[id][eventName]) {
            d.domEvents[id][eventName] = c.createEventReceiver(maybeKeyNode);
            d.addEvent(
                domObj, 
                eventName, 
                function (evt) {
                    var event = evt;
                    if (!evt) { event = window.event; }
//                  event.cancelBubble = true;
//                  if (event.stopPropagation) {event.stopPropagation();}
                    b.injectEvent(event, [d.domEvents[id][eventName]]);
                    return true; /* important for IE, false would prevent things like a checkbox actually checking */
                });
        }
        return c.map_ev(
            maybeKeyNode, 
            function (v) {return v; }, 
            d.domEvents[id][eventName]);
    };
    
    //extractEvent_e: Maybe Event * [Behaviour] Dom * String -> Event
    d.extractEvent_e = function (maybeKeyNode, domObjB, eventName)
    {
        if (!(domObjB instanceof be.Behaviour)) {
            return d.extractEventStatic_e.apply(this, arguments);
        } else {
            var r = c.createEventReceiver(maybeKeyNode);
            var evtEE = c.map_ev( //Event Dom -> Event Event eventName
                    maybeKeyNode,
                    function (domD) {
                        return d.extractEventStatic_e(
                            maybeKeyNode,
                            domD,
                            eventName);
                    },
                    c.merge_e(maybeKeyNode, be.changes(domObjB), r));
            var resultE = c.switch_e(maybeKeyNode, evtEE);
            c.sendEvent( 
                r, 
                be.valueNow(domObjB));
            return resultE;
        }
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'extractEvent_e', d.extractEvent_e);
    $$___a({ul: true, c: true, b: true, a: 1}, '$EVT', d.extractEvent_e);

    //extractEvents_e: 
    //      Maybe Event 
    //      * [Behaviour] Dom  
    //      . Array String
    //      -> Event
    // ex: extractEvents_e(m, 'body', 'mouseover', 'mouseout')
    d.extractEvents_e = function (maybeKeyNode, domObj /* . eventNames */) 
    {
        var eventNames = x.slice(arguments, 2);

        var events = l.map(
            function (eventName) {
                return d.extractEvent_e(maybeKeyNode, domObj, eventName); 
            },
            eventNames.length === 0 ? [] : eventNames);
    
        var args = events;
        args.unshift(maybeKeyNode); 
        return c.merge_e.apply(this, args);
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'extractEvents_e', d.extractEvents_e);

    d.listeners = [];
    //create an event receiver
    d.adaptForState = function (domObj, indices)
    {
        var domObjID = null;
        if (typeof(domObj) == 'object') {
            domObjID = domObj.getAttribute('id');
            if ( (domObjID === null) || (domObjID === undefined) ) {
                domObjID = d.getEventName();
                domObj.setAttribute('id', domObjID);
            }
        } else {
            domObjID = domObj;
        }
        if ((domObjID === null)||(domObjID.length === 0)) { throw 'no obj id to adapt'; }
        var path = l.fold(
            function (elt, path) { return elt + '----' + path; },
            domObjID,
            ((indices === null)||(indices === undefined)||(indices.length===0))?
                [] : indices);
                
        if (!d.listeners[path]) { 
            d.listeners[path] = c.createEventReceiver(b.maybeEmpty);
        }
        return d.listeners[path];
    };
    
    //for use by external api's to inform flapjax
    d.receiveStateChange = function  (domObj, indices, val) 
    {
        c.sendEvent(d.adaptForState(domObj, indices), val);
    };

    //value of dom form object during trigger
    d.extractValueOnEvent_e = function (maybeKeyNode, triggerE, domObj)
    {
        if (!(triggerE instanceof e.Node)) { throw 'extractValueOnEvent_e: expected Event as second arg'; } //SAFETY

        return be.changes(d.extractValueOnEvent_b.apply(this, arguments));

    };
    $$___a({ul: true, c: true}, 'extractValueOnEvent_e', d.extractValueOnEvent_e);
    
    //extractDomFieldOnEvent_e: Maybe Event * Event * Dom U String . Array String -> Event a
    d.extractDomFieldOnEvent_e = function (maybeKeyNode, triggerE, domObj /* . indices */) {
        if (!(triggerE instanceof e.Node)) { throw 'extractDomFieldOnEvent_e: expected Event as second arg'; } //SAFETY
        var indices = x.slice(arguments, 3);
        var res =
            c.map_ev(
                maybeKeyNode, 
                function () { return d.getDomVal(domObj, indices); }, 
                triggerE);
        return res;
    };
    
    
    d.extractValue_e = function (maybeKeyNode, domObj) {
        return be.changes(d.extractValue_b.apply(this, arguments));
    };
    $$___a({ul: true, c: true}, 'extractValue_e', d.extractValue_e);
    $$___a({ul: true, c: true}, '$E', d.extractValue_e);


    //extractValueOnEvent_b: Maybe Event * Event * DOM -> Behaviour
    // value of a dom form object, polled during trigger
    d.extractValueOnEvent_b = function (maybeKeyNode, triggerE, domObj /* . indices */)
    {
        return d.extractValueStatic_b(maybeKeyNode, domObj, triggerE);
    };
    $$___a({ul: true, c: true}, 'extractValueOnEvent_b', d.extractValueOnEvent_b);    
    
    
    //extractValueStatic_b: Maybe Event * DOM [ * Event ] -> Behaviour a
    //If no trigger for extraction is specified, guess one
    d.extractValueStatic_b = function (maybeKeyNode, domObj, triggerE) {

        var indices = x.slice(arguments, 2);
        
        var objD;
        try {
            objD = flapjax.dom.getObj(domObj);
        //This is for IE
        if(typeof(domObj) == 'string' && objD.id != domObj) {
            throw 'Make a radio group';
        }
    } catch (e) {
            objD = {type: 'radio-group', name: domObj};
        }

        var getter; // get value at any current point in time
        
        //TODO: use and extend adaptForState (sync named events)
        //var receiverE; // stream associated with a value (in case of mult. extracts on same)

        switch (objD.type)  {
        
            //TODO: checkbox.value instead of status?
            case 'checkbox': 
      
                return be.hold(
                        maybeKeyNode,
                        c.filterRepeats_e(
                            maybeKeyNode,
                            d.extractDomFieldOnEvent_e(
                                maybeKeyNode,
                                triggerE ? triggerE : 
                                  d.extractEvents_e(
                                      maybeKeyNode, 
                                      objD, 
                                      'click', 'keyup', 'change'),
                                objD,
                                'checked')),
                        objD.checked);

            case 'select-one':
                
                getter = function (_) {                         
                        return objD.selectedIndex > -1 ? 
                                (objD.options[objD.selectedIndex].value ?
                        objD.options[objD.selectedIndex].value :
                    objD.options[objD.selectedIndex].innerText)
                : undefined;
                };
                
                return be.hold(
                        maybeKeyNode,                       
                        c.filterRepeats_e(
                            maybeKeyNode,
                            c.map_ev(
                                maybeKeyNode,
                                getter,
                                triggerE ? triggerE :
                                  d.extractEvents_e(
                                      maybeKeyNode,
                                      objD,
                                      'click', 'keyup', 'change'))),
                        getter());
                            
            case 'select-multiple':
                //TODO ryan's cfilter adapted for equality check
                
                getter = function (_) {
                        var res = [];
                        for (var i = 0; i < objD.options.length; i++) {
                            if (objD.options[i].selected) {
                                res.push(objD.options[i].value ? objD.options[i].value : objD.options[i].innerText);
                            }
                        }
                        return res;
                    };

                
                return be.hold(
                        maybeKeyNode,
                        c.map_ev(
                            maybeKeyNode,
                            getter,
                            triggerE ? triggerE : 
                              d.extractEvents_e(
                                  maybeKeyNode,
                                  objD,
                                  'click', 'keyup', 'change')),
                        getter());
                
            case 'text':
            case 'textarea':
            case 'hidden':
            case 'password':

                return be.hold(
                        maybeKeyNode,
                        c.filterRepeats_e(
                            maybeKeyNode,
                            d.extractDomFieldOnEvent_e(
                                maybeKeyNode,
                                triggerE ? triggerE :
                                  d.extractEvents_e(
                                      maybeKeyNode, 
                                      objD, 
                                      'click', 'keyup', 'change'),
                                objD,
                                'value')),
                        objD.value);

            case 'button': //same as above, but don't filter repeats

                return be.hold(
                        maybeKeyNode,
                        d.extractDomFieldOnEvent_e(
                            maybeKeyNode,
                            triggerE ? triggerE :
                              d.extractEvents_e(
                                  maybeKeyNode, 
                                  objD, 
                                  'click', 'keyup', 'change'),
                            objD,
                            'value'),
                        objD.value);


            case 'radio': 
            case 'radio-group':

                //TODO returns value of selected button, but if none specified,
                //      returns 'on', which is ambiguous. could return index,
                //      but that is probably more annoying
        
                var radiosAD = l.filter(
                        function (elt) { 
                            return (elt.type == 'radio') &&
                                (elt.getAttribute('name') == objD.name); 
                        },
                        document.getElementsByTagName('input'));

                getter = 
                    objD.type == 'radio' ?

                        function (_) {
                            return objD.checked;
                        } :
                            
                        function (_) {
                            for (var i = 0; i < radiosAD.length; i++) {
                                if (radiosAD[i].checked) {
                                    return radiosAD[i].value; 
                                }
                            }
                            return undefined; //TODO throw exn? 
                        };

                var actualTriggerE = triggerE ? triggerE :
                    c.merge_e.apply(
                            this,
                            [maybeKeyNode].concat(
                                l.map(
                                    function (radio) { 
                                    return d.extractEvents_e(
                                        maybeKeyNode, 
                                        radio, 
                                        'click', 'keyup', 'change'); },
                                    radiosAD)));

                return be.hold(
                        maybeKeyNode,
                        c.filterRepeats_e(
                            maybeKeyNode,
                            c.map_ev(
                                maybeKeyNode,
                                getter,
                                actualTriggerE)),
                        getter());
                            
            default:
            
                throw ('extractValueStatic_b: unknown value type "' + objD.type + '"');
        }
    };

    d.extractValue_b = function (maybeKeyNode, domObj) {
        if (domObj instanceof be.Behaviour) {
            return be.switch_b(
                maybeKeyNode,
                be.lift_b(maybeKeyNode,
                    function (dom) {
                        return d.extractValueStatic_b(maybeKeyNode, dom);                           
                    },
                    domObj));
        } else {
            return d.extractValueStatic_b(maybeKeyNode, domObj);
        }
    };
    $$___a({ul: true, b: true, a: 1, c: true}, 'extractValue_b', d.extractValue_b);
    $$___a({ul: true, b: true, c: true, a: 1}, '$B', d.extractValue_b);


    d.insertedValues = []; // insertedValues: Array Event alpha
    d.insertedDoms = []; // insertedDoms: 
    
    //TODO implement
/*  d.insertEventE  = function () { throw 'not implemented'; };
    d.insertEventB  = function () { throw 'not implemented'; }; */

    //into[index] = deepValueNow(from) via descending from object and mutating each field
    d.deepStaticUpdate = function (into, from, index) {
    var fV = (from instanceof be.Behaviour)? be.valueNow(from) : from;
        if (typeof(fV) == 'object') {
            for (var i in fV) {
                if (!(Object.prototype) || !(Object.prototype[i])) {
                     d.deepStaticUpdate(index? into[index] : into, fV[i], i);
                }
            }
        } else {
            var old = into[index];
            into[index] = fV;
            if (!l.isEqual(old, fV)) { d.topE.sendEvent(fV); }
        }
    };

    //note: no object may be time varying, just the fields
    //into[index] = from
    //only updates on changes
    d.deepDynamicUpdate = function (maybeKeyNode, into, from, index) {
        var fV = (from instanceof be.Behaviour)? be.valueNow(from) : from;
        if (typeof(fV) == 'object') {
            if (from instanceof be.Behaviour) {
                throw 'deepDynamicUpdate: dynamic collections not supported';
            }
            for (var i in fV) {
                if (!(Object.prototype) || !(Object.prototype[i])) {
                     d.deepDynamicUpdate(maybeKeyNode, index? into[index] : into, fV[i], i);
                }
            }
        } else {
            if (from instanceof be.Behaviour) {
                e.createNode(
                    maybeKeyNode,
                    [be.changes(from)],
                    function (s, p) {
                        if (index) { 
                            var old = into[index];
                into[index] = p.value;
                if (!l.isEqual(old,p.value)) { d.topE.sendEvent(p.value); }
            }
                        else { into = p.value; } //TODO notify topE?
                    });
            }
        }
    };

    
    d.insertValue = function (val, domObj /* . indices */) {
        var indices = x.slice(arguments, 2);
        var parent = d.getMostDom(domObj, indices);
        d.deepStaticUpdate(parent, val, indices ? indices[indices.length - 1] : undefined);     
    };
    $$___a({ul: true}, 'insertValue', d.insertValue);

    //TODO convenience method (default to firstChild nodeValue) 
    d.insertValueE = function (maybeKeyNode, triggerE, domObj /* . indices */)
    {
        if (!(triggerE instanceof e.Node)) { throw 'insertValueE: expected Event as second arg'; } //SAFETY
    
        var indices = x.slice(arguments, 3);
        var parent = d.getMostDom(domObj, indices);

        c.merge_e(
            maybeKeyNode,
            d.adaptForState(domObj, indices),
            c.map_ev(
                maybeKeyNode,
                function (v) {
                    d.deepStaticUpdate(parent, v, indices? indices[indices.length - 1] : undefined);
                },
                triggerE));
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'insertValueE', d.insertValueE);

    //insertValueB: Maybe Node * Behaviour * domeNode . Array (id) -> void
    //TODO notify adapter of initial state change?
    //TODO use adaptForState(domObj, indices call) in deepDynamicUpdate
    d.insertValueB = function (maybeKeyNode, triggerB, domObj /* . indices */) { 

        var indices = x.slice(arguments, 3);
        var parent = d.getMostDom(domObj, indices);
        
        
        //NOW
        d.deepStaticUpdate(parent, triggerB, indices ? indices[indices.length - 1] : undefined);
    
        //LATER
        d.deepDynamicUpdate(maybeKeyNode, parent, triggerB, indices? indices[indices.length -1] : undefined);
   
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'insertValueB', d.insertValueB);

    //d.insertValuesB: Maybe Node, domObj . Array ([behave a, attrib1, ..]) -> void
    d.insertValuesB = function (maybeKeyNode, domObj)
    {
        var attribsA = 
            l.map(
                function (arr) {return x.slice(arr, 1);},
                x.slice(arguments, 2));
        var triggersAB = 
            l.map(
                function (arr) {return arr[0];},
                x.slice(arguments, 2));
                
    };
    $$___a({ul: true}, 'insertValuesB', d.insertValuesB);

    //TODO copy dom event call backs of original to new? i don't thinks so
    //  complication though: registration of call backs should be scoped
    d.insertDomE = function (maybeKeyNode, triggerE, domObj) {

        if (!(triggerE instanceof e.Node)) { throw 'insertDomE: expected Event as second arg'; } //SAFETY

        var objD = d.getObj(domObj);

        var res = c.map_ev(
                    maybeKeyNode,
                    function (newObj) {
                        //TODO safer check
                        if (!((typeof(newObj) == 'object') && (newObj.nodeType == 1))) { 
                            newObj = d.SPAN({}, newObj);
                        }
                        d.swapDom(objD, newObj);
                        objD = newObj;
                        return newObj; // newObj;
                    },
                    triggerE);

        e.attachListenerNode(res, d.topE);

        return res;
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'insertDomE', d.insertDomE);
    
    //insertDom: dom 
    //          * dom 
    //          [* (null | undefined | 'over' | 'before' | 'after' | 'leftMost' | 'rightMost' | 'beginning' | 'end']
    //          -> void
    // TODO: for consistency, switch replaceWithD, hookD argument order
    d.insertDom = function (hookD, replaceWithD, optPosition)
    {   
        switch (optPosition)
        {
            case undefined:
            case null:
            case 'over':
                d.swapDom(hookD,replaceWithD);
                break;
            case 'before':  
                hookD.parentNode.insertBefore(replaceWithD, hookD);
                break;
            case 'after':
                if (hookD.nextSibling) {
                    hookD.parentNode.insertBefore(replaceWithD, hookD.nextSibling);
                } else {
                    hookD.parentNode.appendChild(replaceWithD);
                }
                break;
            case 'leftMost':
                if (hookD.parentNode.firstChild) { 
                    hookD.parentNode.insertBefore(
                        replaceWithD, 
                        hookD.parentNode.firstChild);
                } else { hookD.parentNode.appendChild(replaceWithD); }
                break;
            case 'rightMost':
                hookD.parentNode.appendChild(replaceWithD);
                break;
            case 'beginning':
                if (hookD.firstChild) { 
                    hookD.insertBefore(
                        replaceWithD, 
                        hookD.firstChild);
                } else { hookD.appendChild(replaceWithD); }
                break;
            case 'end':
                hookD.appendChild(replaceWithD);
                break;
            default:
                throw ('domInsert: unknown position: ' + optPosition);
        }
    };
    
    //insertDom: dom 
    //          * dom U String domID 
    //          [* (null | undefined | 'over' | 'before' | 'after' | 'leftMost' | 'rightMost' | 'beginning' | 'end']
    //          -> void
    d.insertDomClean = function (replaceWithD, hook, optPosition) {
        //TODO span of textnode instead of textnode?
    d.insertDom(
        d.getObj(hook), 
        ((typeof(replaceWithD) == 'object') && (replaceWithD.nodeType > 0)) ? replaceWithD :
            document.createTextNode(replaceWithD),      
        optPosition);           
    };
    $$___a({ul: true}, 'insertDom', d.insertDomClean);


    //TODO test
    //insertDomB: Maybe Node 
    //      * [Behaviour] String U Dom 
    //      [* ( id U null U undefined ) 
    //          [* ('before' U 'after' U 'leftMost' U 'rightMost' U 'over' U 'beginning' U 'end')]]
    //      -> Behaviour a
    //if optID not specified, id must be set in init val of trigger
    //if position is not specified, default to 'over'
    //performs initial swap onload    
    d.duid = 0; //created dom node IDs: 'flapjaxduidZZZ'
    d.insertDomB = function (maybeKeyNode, initTriggerB, optID, optPosition) {

        if (!(initTriggerB instanceof be.Behaviour)) { 
            initTriggerB = be.createConstantB(maybeKeyNode, initTriggerB);
        }

        var triggerB = 
            be.lift_b(
                maybeKeyNode,
                function (d) { 
                    if ((typeof(d) == 'object') && (d.nodeType >  0)) {
                        return d;
                    } else {
                        var res = document.createElement('span'); //TODO createText instead
                        res.appendChild(document.createTextNode(d));
                        return res;
                    }
                },
                initTriggerB);

        var initD = be.valueNow(triggerB);
        if (!((typeof(initD) == 'object') && (initD.nodeType == 1))) { throw ('insertDomB: initial value conversion failed: ' + initD); } //SAFETY  

        d.insertDom(
            optID === null || optID === undefined ? d.getObj(initD.getAttribute('id')) : d.getObj(optID), 
            initD, 
            optPosition);
     
        var resB = be.hold(
            maybeKeyNode, 
            d.insertDomE(
                maybeKeyNode, 
                be.changes(triggerB),
                initD), 
            initD);

        //c.sendEvent(d.topE, initD); //initial call set by insertDom
        return true;
    };
    $$___a({ul: true, c: true, b: true, a: 1}, 'insertDomB', d.insertDomB);


    //TODO get crazy [topE?]
    //TODO change to:  Maybe Event * String [ * [Behaviour] dom], defaulting to topE 
    d.extractId_b = function (maybeKeyNode, id, start)
    {
        return be.hold(
            maybeKeyNode,
            e.createNode(
                maybeKeyNode,
                start === undefined? [d.topE] :
                    start instanceof be.Behaviour? [be.changes(start)] :
                    [],
                function (s, p) {
                    p.value = d.getObj(id);
                    s(p);
                }),
            d.getObj(id));
    };
    $$___a({ul: true, c: true, b: true, a: 2}, 'extractId_b', d.extractId_b);


    var m_b; 
    d.mouse_b = function (maybeKeyNode, domObj /* . events */)
    {

        var eventNames = x.slice(arguments, 2);
        if (arguments.length < 3) { eventNames = ['mousemove']; }
        
        if ((domObj === undefined) || (domObj === null)) { domObj = document; }
        if ((m_b !== undefined) && 
            (arguments.length < 3) && 
            (domObj == document)) { 
            return m_b; 
        } 
        
        var triggerE = (eventNames.length == 1)?
            d.extractEvent_e(maybeKeyNode, domObj, eventNames[0]) :
            c.merge_e.apply(
            this,
            [maybeKeyNode].concat(
                l.map(
                function (evt) {
                    return d.extractEvent_e(maybeKeyNode, domObj, evt);
                },
                eventNames)));

        var res = be.hold(
            maybeKeyNode, 
            c.map_ev(
                maybeKeyNode,
                function (e) {
                    return (e.pageX || e.pageY) ?  
                            {left: e.pageX, top: e.pageY} :
                        (e.clientX || e.clientY) ?
                            {left: e.clientX + document.body.scrollLeft,
                             top: e.clientY + document.body.scrollTop} :
                        {left: 0, top: 0};
                },
                triggerE), 
            {left: 0, top: 0});
        
        if (arguments.length < 3 && domObj == document) { m_b = res; }
        
        return res; 
    };
    $$___a({ul: true, c: true}, 'mouse_b', d.mouse_b);
    
    d.mouseLeft_b = function (maybeKeyNode, domObj /* .events */)
    {
        return be.lift_b(
            maybeKeyNode,
            function (posn) {  return posn.left; },
            d.mouse_b.apply(this, arguments));
    };
    $$___a({ul: true, c: true}, 'mouseLeft_b', d.mouseLeft_b);

    d.mouseTop_b = function (maybeKeyNode, domObj /* .events */)
    {
        return be.lift_b(
            maybeKeyNode,
            function (posn) { return posn.top; },
            d.mouse_b.apply(this, arguments));
    };
    $$___a({ul: true, c: true}, 'mouseTop_b', d.mouseTop_b);


    flapjax.anim = {};
    anim = flapjax.anim;

    flapjax.ajax = {

        //credit Matt White
        //TODO if a param shows up repeatadly, possibly return it as an array
         getURLParam: function (param){
            var lparam = param.toLowerCase();
            var strReturn = undefined;
            var strHref = window.location.href;
            if ( strHref.indexOf("?") > -1 ){
                var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
                var aQueryString = strQueryString.split("&");
                for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
                    if (aQueryString[iParam].indexOf(lparam + "=") > -1 ){
                        var aParam = aQueryString[iParam].split("=");
                        strReturn = aParam[1];
                        break;
                    }
                }
            }
            return strReturn;
         },
    
        //credit: everywhere on the net, Jim  Ley (Jibbering)
        //getHTTPObject: -> httpobj | false
        getHTTPObject: function () {
            var xmlhttp = false;
            /*@cc_on @*/
            /*@if (@_jscript_version >= 5)
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xmlhttp = false;
                }
            }
            @end @*/
            if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
                try {
                    xmlhttp = new XMLHttpRequest();
                } catch (e) {
                    xmlhttp=false;
                }
            }
            if (!xmlhttp && window.createRequest) {
                try {
                    xmlhttp = window.createRequest();
                } catch (e) {
                    xmlhttp=false;
                }
            }
            return xmlhttp;
        },
        
        //credit Quirksmode
        //readCookie: String -> String U Undefined
        readCookie: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i=0; i < ca.length; i++) {
                var co = ca[i];
                while (co.charAt(0) == ' ') { co = co.substring(1, co.length); }
                if (co.indexOf(nameEQ) === 0) { 
                    return co.substring(nameEQ.length, co.length);
                }
            }
            return undefined;       
        }

    };
    
    a = flapjax.ajax;
    $$___a({ul: true}, 'getHTTPObject', a.getHTTPObject);
    $$___a({ul: true}, 'getURLParam', a.getURLParam);
    $$___a({ul: true}, '$URL', a.getURLParam);
    $$___a({ul: true}, "readCookie", a.readCookie);
    
    //TODO generic form that specifies the full onsteadystatechange function?
    a.rpc = function (url, postData, httpReceiver, async) {
        var http = a.getHTTPObject();
        http.open("POST", url, (async === undefined)? true : async);
        http.setRequestHeader(
            "Content-type", 
            "application/x-www-form-urlencoded");
        http.onreadystatechange = function ()
        {
            if (http.readyState == 4) {
                httpReceiver(http);
            }
        };
        http.send(postData);
    };
    $$___a({ul: true}, 'rpc', a.rpc);
    $$___a({ul: true}, 'rpcPost', a.rpc);
    
    a.rpcGet = function (url, httpReceiver, async) {
        var http = a.getHTTPObject();
        http.open("GET", url, (async === undefined)? true : async);
        http.onreadystatechange= function() {
            if (http.readyState == 4) {
                httpReceiver(http);
            }
        };
        http.send(null); // null so no request header content-type
    };
    $$___a({ul: true}, 'rpcGet', a.rpcGet);

    //httpRPC: Maybe Node * Node {url, postData} [*  a -> b] -> Node b
    a.httpRPC_e = function (maybeKeyNode, node, approx) 
    {
    
        var rpcE = e.createNode(
            maybeKeyNode,
            [node],
            function (s, p) {
                a.rpc(
                    p.value.url,
                    p.value.postData,
                    function (http) {
                        s(new b.Pulse(p.stamp, p.path, http.responseText)); });
            });

        return (approx instanceof Function) ?
            c.merge_e(
                maybeKeyNode,
                c.map_ev(maybeKeyNode, approx, node),
                rpcE) :
            rpcE;
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'httpRPC_e', a.httpRPC_e);
    
    //========== dynamic scripts ==========
    a.scriptCounter = 0;
    a.deleteScript = function (scriptID) 
    {
        var scriptD = d.getObj(scriptID);
        scriptD.parentNode.removeChild(scriptD); //TODO isolate child and set innerHTML to "" to avoid psuedo-leaks?
    };
    
    // optional fn/param that gets polled until parm is defined
    a.runScript = function (url, fn, param) 
    {
        var script = document.createElement("script");
        script.src = url;
        var scriptID = 'scriptFnRPC' + a.scriptCounter++;
        script.setAttribute('id', scriptID);
        document.getElementsByTagName("head").item(0).appendChild(script);
        var timer = {};
        var check = 
            function () {
                eval("try { if (" + param + "!== undefined) {var stat = " + param + ";}} catch (e) {}");
                if (stat !== undefined) {
                    eval(param + " = undefined;");
                    clearInterval(timer.timer);
                    clearInterval(timer.timeout);
                    if (fn instanceof Function) { fn(stat); }
                    a.deleteScript(scriptID);
                }
            };
        timer.timer = setInterval(check, 3500);
        timer.timeout = 
            setTimeout( 
                function () { 
                    try { clearInterval(timer.timer); }
                    catch (e) {}
                },
                5000); //TODO make parameter?
    };
    
    //evalForeignScriptVal_e: Maybe Node * Node {url, globalArg} -> Node a
    //load script @ url and poll until param is set, then pass it along
    a.evalForeignScriptVal_e = function (maybeKeyNode, node)
    {
        return e.createNode(
            maybeKeyNode,
            [node],
            function (s, p) {
                a.runScript(
                    p.value.url,
                    function (globalArg) {
                        s(new b.Pulse(p.stamp, p.path, globalArg));
                    },
                    p.value.globalArg);
            });
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'evalForeignScriptVal_e', a.evalForeignScriptVal_e);
    
    //evalForeignScriptFn_e: Maybe Node * Node {String before, String after} -> Node a
    //load script with gap between before/after for the potential handler name
    a.evalForeignScriptFn_e = function (maybeKeyNode, node)
    {
        return e.createNode(
            maybeKeyNode,
            [node],
            function (s, p) {
                var fnName = 'scriptFnRPC' + a.scriptCounter++;
                eval(fnName +"= function (res){"+
            "s(new b.Pulse(p.stamp, p.path, res));"+
            "setTimeout(function(){a.deleteScript(\"" + fnName + "\")},1000);}");
        var script = document.createElement("script");
        script.src = p.value.before + fnName + p.value.after;
        var scriptID = fnName;
        script.setAttribute('id', scriptID);
        document.getElementsByTagName("head").item(0).appendChild(script);
            });
    };
    $$___a({ul: true, c: true, e: true, a: 1}, 'evalForeignScriptFn_e', a.evalForeignScriptFn_e);

    //============= JSONRPC variant ========/
    
    // COMPILER HOOKS [Mike/Leo would be sad if this breaks]
    flapjax.compiler = {
        // weaveKeynode:
        //   flapjax_object (-> keynode) (keynode a -> b) ->
        //   (a -> b)
        //
        // the (keynode a -> b) function will be called as a method
        // on the flapjax object; thus, the function in general
        // should be one of the functions from flapjax.pub
        weaveKeynode: function (fj, get_keynode, fj_method) {
            return function () {
                var args = [get_keynode()];
                for (var i = 0;i < arguments.length;i++) {
                    args.push(arguments[i]);
                }
                return fj_method.apply(fj, args);
            };
        },

        weaveKeynodeForDotRef: function (obj, get_keynode, id) {
            return flapjax.compiler.weaveKeynode(obj, get_keynode, obj[id]);
        },

        applyFirst: function (f /* args */) {
            return f.apply(this,
                flapjax.xlib.slice(arguments, 1));
        },

        mixedInsertValue_eb: function (trigger /* opts */) {
            var opts = flapjax.xlib.slice(arguments, 1);

            var insertValue = (trigger instanceof e.Node) ? d.insertValueE : d.insertValueB;
            return insertValue.apply(this, [flapjax.base.maybeEmpty, trigger].concat(opts));

        },

        mixedInsertDom_eb: function (trigger /* opts */) {
            var opts = flapjax.xlib.slice(arguments, 1);

            var insertDom = (trigger instanceof e.Node) ? d.insertDomE : d.insertDomB;
            
            return insertDom.apply(this, [flapjax.base.maybeEmpty, trigger].concat(opts));
        },

        mixedCall_eb: function (maybeKeyNode /* args */) {
            if ((arguments.length > 1) &&
                (arguments[1] instanceof Function) &&
                (arguments[1].___doNotLift)) {
                    return arguments[1].apply(
                        this, 
                        flapjax.xlib.slice(arguments, 2));
            } else {
                return flapjax.compiler.mixedLift_eb.apply(this, arguments);
            }
        },
        
        //mixedLift_eb: 
        //      Maybe Event
        //      * [Event U Behaviour] a_1 ... a_n -> b
        //      * [Event U Behaviour] a_1 ... [Event U Behaviour] a_n
        //      * -> [Event U Behaviour] b
        // lift a function application, assuming all positions are 
        //      events and constants, behaviours and constants, or just constants
        // in case all constant, immediately applies & returns flat
        mixedLift_eb: function (maybeKeyNode /* args */) {
            var hasEs = false;
            var hasBs = false;
            var args = flapjax.xlib.slice(arguments, 1);
            for (var i = 0; (i < args.length) && !(hasEs && hasBs); i++) {
                if (args[i] instanceof e.Node) { hasEs = true; }
                else if (args[i] instanceof be.Behaviour) { hasBs = true;}
            }
            
            if (hasEs && hasBs) { throw 'mixedLift_eb: type mismatch'; }
            else {
                return hasEs ? c.lift_e.apply(this, arguments) :
                    hasBs ? be.lift_b.apply(this, arguments) :
                    arguments[1].apply(this, flapjax.xlib.slice(arguments, 2));
            }
        },

        //mixedIf_eb: 
        //      Maybe Event
        //      * [Event U Behaviour] test then else
        //      * -> [Event U Behaviour] b
        // lift a conditional, assuming all positions are 
        //      events and constants, behaviours and constants, or just constants
        mixedIf_eb: function (maybeKeyNode /* args */) {
            var hasEs = false;
            var hasBs = false;
            var args = x.slice(arguments, 1);
            for (var i = 0; (i < args.length) && !(hasEs && hasBs); i++) {
                if (args[i] instanceof e.Node) { hasEs = true; }
                else if (args[i] instanceof be.Behaviour) { hasBs = true;}
            }
            
            if (hasEs && hasBs) { throw 'mixedIf_eb: type mismatch'; }
            else {
                return hasEs? c.if_e.apply(this, arguments) :
                    hasBs ? be.if2_b.apply(this, arguments) : //TODO choose if/2
                    arguments[1] ? arguments[2] : arguments[3];
            }
        },

        insertStaticCollectionProperty_b: function (maybeKeyNode, baseCollection, newCollection) {
            d.enstyle(
                maybeKeyNode,
                {reconstructTag: function () { throw 'error: inserted collection should have been static'; },
                 recordHook: function () { throw 'error: inserted collection should have been static'; }},
                baseCollection,
                newCollection);
        }
    };
    compiler = flapjax.compiler;    
    for (var fn in compiler) { compiler[fn].___doNotLift = true; } //mixedCall may call things like mixedLift


    /////////////////////////////// FORMAT RETURN & NAMESPACE //////////////////
    
    /*
     * 1. put in error checking for context
     * 2. optionally make contexts implicit (param)
     * 3. add functions to Event and Behaviour prototypes
     * 4. package public functions
     * 5. optionally export public functions to global namespace     
     */


    /* ANNOTATIONS */
    var context = flapjax.base.maybeEmpty;
    var contextStack = [context];

    /* explicit context parameter in dot notation and pub functions? */
    $$___a({ul: true}, 'pushContext', function (v) { context = v; contextStack.push(v); });
    $$___a({ul: true}, 'popContext', function () { context = contextStack.pop(); });        

    flapjax.annotations =
    {
        /* add context check */
        checkForContextFn: 
            function (fnName, fn) {
                return function (maybeKeyNode /* . rest */) {                   
                        if (!(maybeKeyNode instanceof flapjax.base.Maybe)) {
                            throw (fnName + ': expected Maybe Event as first argument');
                        }
                        return fn.apply(this, arguments);
                    };
            },
        
        /* add to prototype */
        //when chaining function, thread parent is 'a'th argument to function
        addTupleToProtoMaker:
            function (proto) {
                return function (tuple) {
                    proto[tuple[1]] =  
                        function () {
                        
                            var args;
                            if (tuple[0].c && explicitContext !== true && (tuple[0].a !== undefined)) {
                                args = [];
                                //remember, context already removed
                                for (var i = 0; i < tuple[0].a - 1; i++) {
                                    args.push(arguments[i]);
                                }
                                args.push(this);
                                args = args.concat(x.slice(arguments, tuple[0].a - 1));
                            } else if ( tuple[0].a !== undefined ) {
                                args = [];
                                for (var jj = 0; jj < tuple[0].a; jj++) {
                                    args.push(arguments[jj]);
                                }
                                args.push(this);
                                args = args.concat(x.slice(arguments, tuple[0].a));
                            } else {
                                args = arguments;
                            }
                            
                            return tuple[2].apply(this, args); 
                        };
                };
            },
            
        makeImplicitContextFn: 
            function (fn) {
                return function () {
                    //BUG 8/17/2006 - leo - concat(arguments) doesn't work, make copy
                    var args = [context].concat(x.slice(arguments, 0));
                    return fn.apply(this, args);
                };
            }
    };
    var annotations = flapjax.annotations;
            

    annotations.addTupleToBehaviour = 
        annotations.addTupleToProtoMaker(be.Behaviour.prototype);
    annotations.addTupleToNode = 
        annotations.addTupleToProtoMaker(e.Node.prototype);

    //////////////// THE RETURN ////////////////////
    flapjax.pub = {

        util: flapjax
        
    };

//  var chunks = [];
//  var currChunk = undefined;
    //////////////// APPLY ANNOTATIONS /////////////
    for (var k = 0; k < $___a.length; k++) { 

//      if ($___a[k][2] == currChunk[2]) { $___a[k][3] = currChunk; }
//      else { currChunk = $___a[k]; }

        //tuple: [{attributes}, String name, Function]

        if ($___a[k][0].c) { 
        
            ///////// 1. CONTEXT CHECK
            $___a[k][2] = annotations.checkForContextFn($___a[k][1], $___a[k][2]); 
            
            ///////// 2. MAKE CONTEXT EXPLICIT
            if (explicitContext !== true) {
                $___a[k][2] = annotations.makeImplicitContextFn($___a[k][2]);
            }
            
        }

        ///////// 3. FILL EVENT & BEHAVIOUR PROTOTYPES
        if ($___a[k][0].b) { annotations.addTupleToBehaviour($___a[k]); }
        if ($___a[k][0].e) { annotations.addTupleToNode($___a[k]); }
        
        ///////// 3.5 MIXED LIFT ANNOTATION
        /* if ul is true, then the function should not be lifted,
                  so we set ___doNotLift.  if ul is false (the default), then
                  the function should be lifted, so we don't set ___doNotLift
                  the default value for ___doNotLift is false, which is to say
                  that functions are lifted by default. */

    $___a[k][2].___doNotLift = ($___a[k][0].ul === true) ? true : false;
      

        ///////// 4. PACKAGE FUNCTIONS  
        if ($___a[k][0].np !== true) { flapjax.pub[$___a[k][1]] = $___a[k][2]; }
    }
    
    ///////// 5. OPTIONALLY EXPORT PUBLIC FUNCTIONS TO GLOBAL NAMESPACE
    if (makeTopLevel !== false) {
        for (var zz in flapjax.pub) {
//          window[zz] = flapjax.pub[zz]; // use eval instead so as to achieve Flash compatibility
            eval(zz + " = flapjax.pub." + zz + ";"); // eval may require manual treatment w.r.t. js compressors 
        }
    }


    return flapjax.pub;
}
