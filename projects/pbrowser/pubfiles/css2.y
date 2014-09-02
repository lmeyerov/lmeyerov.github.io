%{
#include <stdio.h>

#include <iostream>
#include <vector>
#include <utility>
#include <math.h>
#include <cstdlib>
//timer
#include <time.h>

#include "selectors.h"

extern int yyparse(void);
extern int yylex(void);
extern int yywrap();

using namespace std;


vector<RuleSelector*> ruleSelectors;



int yydebug;

int main()
{
  
	yydebug=1;
	yyparse();
	cout << "done" << endl;
}


extern void yyerror (char *s) {fprintf (stderr, "oops: %s\n", s);}

%}


%token <text> STRING IDENT HASH DIMEN
%token <fval> EMS EXS LENGTH ANGLE TIME FREQ PERCENTAGE NUMBER

%token S CHARSET_SYM IMPORT_SYM URI COMMA LBRACE RBRACE MEDIA_SYM PAGE_SYM PLUS GREATER INCLUDES DASHMATCH FUNCTION IMPORTANT_SYM INVALID DIMENSION FONT_FACE_SYM ATKEYWORD UNICODERANGE


%union
{
  COMBINATOR combo;
  int ival;
  float fval;
  char *text;
  Selector *sel;
  vector< Selector* > *sels;
  SelectorPredicate *selp;
} 


%%


stylesheet
  : opt_charset
    import_list 
    chooser_list
  ;
  
opt_charset
  :
  | CHARSET_SYM STRING ';'
  ;

import_list
  :
  | import_list import 
  ;

chooser_list
  :
  | chooser_list chooser 
  ;

chooser
  : ruleset
  | media 
  | page 
  ;
    
import
  : IMPORT_SYM 
    string_or_uri opt_medium_list ';' 
  ;

string_or_uri
  : STRING
  | URI
  ;

opt_medium_list
  :
  | medium_list
  ;
  
medium_list
  : medium
  | medium_list COMMA  medium
  ;
    
media
  : MEDIA_SYM  medium_list LBRACE  ruleset_list RBRACE 
  ;
  
ruleset_list
  :
  | ruleset_list ruleset 
  ;
  
medium
  : IDENT 
  ;

page
  : PAGE_SYM  opt_pseudo_page 
    LBRACE  opt_declaration declaration_list  RBRACE 
  ;

declaration_list
  : 
  | declaration_list ';' opt_declaration
  ;

opt_pseudo_page
  :
  | pseudo_page
  ;
  
pseudo_page
  : ':' IDENT
  ;
  
operator
  : '/'  
  | COMMA  
  |
  ;
    
unary_operator
  : '-' | PLUS
  ;
  
property
  : IDENT 
  ;
  
ruleset
  : selector 
    selector_list
    LBRACE 
    opt_declaration 
    rule_declaration_list 
    RBRACE    
  ;

selector_list
  : 
  | selector_list COMMA opt_s selector
  ;

selector
  : simple_selector    
  | selector combinator simple_selector
  ;

combinator  
  : S 
  | opt_s PLUS opt_s
  | opt_s GREATER opt_s
  ;

simple_selector
  : predicate_list
  ;

hd_item
  : elt 
  | predicate 
  ;


/* gets selp, returns selp */ 
elt
  : IDENT 
  | '*' 
  ;

/* gets selp, returns selp */  
predicate_list
  : hd_item 
  | predicate_list predicate
  ;
  
predicate
  : HASH 
  | '.' IDENT 
  | '['  IDENT  opt_attrib_quals ']' 
  | ':' pseudo
  ;      
  
opt_attrib_quals
  :
  | attrib_qual  ident_or_string 
  ;
  
attrib_qual
  : '='
  | INCLUDES
  | DASHMATCH
  ;
  
ident_or_string
  : IDENT 
  | STRING
  ;
  
pseudo
  : IDENT
  | FUNCTION  opt_ident  ')'
  ;
  
opt_ident
  : 
  | IDENT
  ;

rule_declaration_list
  : 
  | rule_declaration_list ';'  opt_declaration
  ;

opt_declaration
  : 
  | declaration
  ;
  
declaration
  : property ':'  expr opt_prio
  ;
  
opt_prio
  :
  | prio
  ;
  
prio
  : IMPORTANT_SYM 
  ;
  
expr
  : term_list
  ;
  
term_list
  : term
  | term_list operator term
  ;
  
term
  : opt_unary_operator term_number
  | STRING  
  | IDENT  
  | URI  
  | hexcolor 
  | function
  ;

term_number
  : NUMBER  
  | PERCENTAGE  
  | LENGTH  
  | EMS
  | EXS  
  | ANGLE  
  | TIME  
  | FREQ 
  ;
  
opt_unary_operator
  :
  | unary_operator
  ;
  
function
  : FUNCTION  expr ')' 
  ;
/*
 * There is a constraint on the color that it must
 * have either 3 or 6 hex-digits (i.e., [0-9a-fA-F])
 * after the "#"; e.g., "#000" is OK, but "#abcd" is not.
 */
hexcolor
  : HASH 
  ;
  
opt_s
  : 
  | S
  ;