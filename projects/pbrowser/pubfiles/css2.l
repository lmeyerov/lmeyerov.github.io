%{


#include <iostream>
#include <vector>
#include <math.h>
#include <cstdlib>
//timer
#include <time.h>

#include "selectors.h"
#include "css2.h"

using namespace std;
extern YYSTYPE yylval;
bool acceptingS = false;
bool inBrace = false;

%}

%option case-insensitive
%option noyywrap

h		[0-9a-f]
nonascii	[\200-\377]
unicode		\\{h}{1,6}[ \t\r\n\f]?
escape		{unicode}|\\[ -~\200-\377]
nmstart		[a-z]|{nonascii}|{escape}|"_"|"-"
nmchar		[a-z0-9-]|{nonascii}|{escape}|"_"
string1		\"([\t !#$%&(-~]|\\{nl}|\'|{nonascii}|{escape})*\"
string2		\'([\t !#$%&(-~]|\\{nl}|\"|{nonascii}|{escape})*\'

ident		{nmstart}{nmchar}*
name		{nmchar}+
num		[0-9]+|[0-9]*"."[0-9]+
string		{string1}|{string2}
url		([!#$%&*-~]|{nonascii}|{escape})*
w		[ \t\r\n\f]*
s		[ \t\r\n\f]+
nl		\n|\r\n|\r|\f
range		\?{1,6}|{h}(\?{0,5}|{h}(\?{0,4}|{h}(\?{0,3}|{h}(\?{0,2}|{h}(\??|{h})))))

%%

{w}"{"			{ acceptingS = false; 
                  inBrace = true;
                  return LBRACE; }

"}"{w}			{ inBrace = false;
                  return RBRACE; }

{s}	            { if (acceptingS) { return S;}  }

{ident}			{if (!inBrace) { acceptingS = true; }
                 yylval.text = strdup(yytext);
                 return IDENT;}



\/\*[^*]*\*+([^/][^*]*\*+)*\/	/* ignore comments */

"<!--"			
"-->"			
"~="			{return INCLUDES;}
"|="			{return DASHMATCH;}

{w}","{w}		{return COMMA;}
{w}">"{w}		{return GREATER;}
{w}"+"{w}		{return PLUS;}

{s}				{if (acceptingS) { return S; } }
{string}		{if (!inBrace) { acceptingS = true; }
                 yylval.text =strdup(yytext);
                 return STRING;}

"#"{name}		{if (!inBrace) { acceptingS = true; }
				 yylval.text = yytext; /*skip hash?*/
                 return HASH;}

"@import"		{return IMPORT_SYM;}
"@page"			{return PAGE_SYM;}
"@media"		{return MEDIA_SYM;}
"@font-face"	{return FONT_FACE_SYM;}
"@charset"		{return CHARSET_SYM;}
"@"{ident}		{return ATKEYWORD;}

"!{w}important"	
"!important"	/* TODO */		

{num}em			{yylval.fval=atof(yytext);
                 return EMS;}

{num}ex			{yylval.fval=atof(yytext);
                 return EXS;}

{num}px			{yylval.fval=atof(yytext);
                 return LENGTH;}

{num}cm			{yylval.fval=atof(yytext);
                 return LENGTH;}

{num}mm			{yylval.fval=atof(yytext);
                 return LENGTH;}

{num}in			{yylval.fval=atof(yytext);
                 return LENGTH;}

{num}pt			{yylval.fval=atof(yytext);
                 return LENGTH;}

{num}pc			{yylval.fval=atof(yytext);
                 return LENGTH;}

{num}deg		{yylval.fval=atof(yytext);
                 return ANGLE;}

{num}rad		{yylval.fval=atof(yytext);
                 return ANGLE;}

{num}grad		{yylval.fval=atof(yytext);
                 return ANGLE;}

{num}ms			{yylval.fval=atof(yytext);
                 return TIME;}

{num}s			{yylval.fval=atof(yytext);
                 return TIME;}

{num}Hz			{yylval.fval=atof(yytext);
                 return FREQ;}

{num}kHz		{yylval.fval=atof(yytext);
                 return FREQ;}

{num}{ident}	{yylval.text =strdup(yytext);
                 return DIMEN;}

{num}%			{yylval.fval=atof(yytext);
                 return PERCENTAGE;}

{num}			{yylval.fval=atof(yytext);
                 return NUMBER;}

"url("{w}{string}{w}")"	{return URI;}
"url("{w}{url}{w}")"	{return URI;}
{ident}"("		{return FUNCTION;}

U\+{range}		{return UNICODERANGE;}
U\+{h}{1,6}-{h}{1,6}	{return UNICODERANGE;}

.			    { return *yytext;}

