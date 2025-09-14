import type { SchemaGamePlatforms } from "@shared/types/games.ts";

export const filterPlatformName = ( platforms: SchemaGamePlatforms ) => {
  let rawArr: string[] = [];

  platforms.forEach( ( platform ) => {
    if ( platform.platform && platform.platform.slug ) rawArr.push(
      platform.platform.slug );
  } );

  const filterArr = rawArr.map( ( name ) => {
    if ( name.includes( "playstation" ) ) return "Playstation";
    if ( name.includes( "xbox" ) ) return "Xbox";
    if ( name.includes( "pc" ) ) return "PC";
    if ( name.includes( "nintendo" ) ) return "Nintendo";
    if ( name.includes( "mobile" ) ) return "Mobile";
    if ( name.includes( "linux" ) ) return "Linux";
    if ( name.includes( "mac" ) ) return "Mac";
    if ( name.includes( "ios" ) ) return "iOS";
    if ( name.includes( "android" ) ) return "Android";
  } )

  return Array.from( new Map(
    filterArr.map(
      ( platformName ) => [ platformName, true ] ) ).keys() )
    .filter( ( name ) => name !== undefined ).sort()

}