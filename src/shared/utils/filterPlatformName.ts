import type { SchemaGamePlatforms } from "@shared/types/games.ts";

export const filterPlatformName = ( platforms: SchemaGamePlatforms ) => {
  let rawArr: string[] = [];

  platforms.forEach( ( platform ) => {
    if ( platform.platform && platform.platform.name ) rawArr.push(
      platform.platform.name );
  } );

  const filterArr = rawArr.map( ( name ) => {
    if ( name.includes( "Playstation" ) ) return "Playstation";
    if ( name.includes( "Xbox" ) ) return "Xbox";
    if ( name.includes( "PC" ) ) return "PC";
    if ( name.includes( "Nintendo" ) ) return "Nintendo";
    if ( name.includes( "Switch" ) ) return "Switch";
    if ( name.includes( "Mobile" ) ) return "Mobile";
    if ( name.includes( "Linux" ) ) return "Linux";
    if ( name.includes( "Mac" ) ) return "Mac";
    if ( name.includes( "iOS" ) ) return "iOS";
    if ( name.includes( "Android" ) ) return "Android";
  } )

  const platformsNames = Array.from( new Map(
    filterArr.map(
      ( platformName ) => [ platformName, true ] ) ).keys() )
    .filter( ( name ) => name !== undefined ).sort()

  return platformsNames;
}