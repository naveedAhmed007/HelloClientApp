package com.itoasis.hello;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class CountryUtils {

    private static final String COUNTRY_DATA = "[{\n" +
            "    \"NAME\": \"Afghanistan\",\n" +
            "    \"ISD\": \"93\",\n" +
            "    \"CODE1\": \"AFG\",\n" +
            "    \"CODE2\": \"AF\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Albania\",\n" +
            "    \"ISD\": \"355\",\n" +
            "    \"CODE1\": \"ALB\",\n" +
            "    \"CODE2\": \"AL\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Algeria\",\n" +
            "    \"ISD\": \"213\",\n" +
            "    \"CODE1\": \"DZA\",\n" +
            "    \"CODE2\": \"DZ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"American Samoa\",\n" +
            "    \"ISD\": \"1684\",\n" +
            "    \"CODE1\": \"ASM\",\n" +
            "    \"CODE2\": \"AS\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Andorra\",\n" +
            "    \"ISD\": \"376\",\n" +
            "    \"CODE1\": \"AND\",\n" +
            "    \"CODE2\": \"AD\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Angola\",\n" +
            "    \"ISD\": \"244\",\n" +
            "    \"CODE1\": \"AGO\",\n" +
            "    \"CODE2\": \"AO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Anguilla\",\n" +
            "    \"ISD\": \"1264\",\n" +
            "    \"CODE1\": \"AIA\",\n" +
            "    \"CODE2\": \"AI\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Antarctica\",\n" +
            "    \"ISD\": \"672\",\n" +
            "    \"CODE1\": \"ATA\",\n" +
            "    \"CODE2\": \"AQ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Antigua and Barbuda\",\n" +
            "    \"ISD\": \"1268\",\n" +
            "    \"CODE1\": \"ATG\",\n" +
            "    \"CODE2\": \"AG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Argentina\",\n" +
            "    \"ISD\": \"54\",\n" +
            "    \"CODE1\": \"ARG\",\n" +
            "    \"CODE2\": \"AR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Armenia\",\n" +
            "    \"ISD\": \"374\",\n" +
            "    \"CODE1\": \"ARM\",\n" +
            "    \"CODE2\": \"AM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Aruba\",\n" +
            "    \"ISD\": \"297\",\n" +
            "    \"CODE1\": \"ABW\",\n" +
            "    \"CODE2\": \"AW\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Australia\",\n" +
            "    \"ISD\": \"61\",\n" +
            "    \"CODE1\": \"AUS\",\n" +
            "    \"CODE2\": \"AU\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Austria\",\n" +
            "    \"ISD\": \"43\",\n" +
            "    \"CODE1\": \"AUT\",\n" +
            "    \"CODE2\": \"AT\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Azerbaijan\",\n" +
            "    \"ISD\": \"994\",\n" +
            "    \"CODE1\": \"AZE\",\n" +
            "    \"CODE2\": \"AZ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Bahamas\",\n" +
            "    \"ISD\": \"1242\",\n" +
            "    \"CODE1\": \"BHS\",\n" +
            "    \"CODE2\": \"BS\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Bahrain\",\n" +
            "    \"ISD\": \"973\",\n" +
            "    \"CODE1\": \"BHR\",\n" +
            "    \"CODE2\": \"BH\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Bangladesh\",\n" +
            "    \"ISD\": \"880\",\n" +
            "    \"CODE1\": \"BGD\",\n" +
            "    \"CODE2\": \"BD\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Barbados\",\n" +
            "    \"ISD\": \"1246\",\n" +
            "    \"CODE1\": \"BRB\",\n" +
            "    \"CODE2\": \"BB\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Belarus\",\n" +
            "    \"ISD\": \"375\",\n" +
            "    \"CODE1\": \"BLR\",\n" +
            "    \"CODE2\": \"BY\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Belgium\",\n" +
            "    \"ISD\": \"32\",\n" +
            "    \"CODE1\": \"BEL\",\n" +
            "    \"CODE2\": \"BE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Belize\",\n" +
            "    \"ISD\": \"501\",\n" +
            "    \"CODE1\": \"BLZ\",\n" +
            "    \"CODE2\": \"BZ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Benin\",\n" +
            "    \"ISD\": \"229\",\n" +
            "    \"CODE1\": \"BEN\",\n" +
            "    \"CODE2\": \"BJ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Bermuda\",\n" +
            "    \"ISD\": \"1441\",\n" +
            "    \"CODE1\": \"BMU\",\n" +
            "    \"CODE2\": \"BM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Bhutan\",\n" +
            "    \"ISD\": \"975\",\n" +
            "    \"CODE1\": \"BTN\",\n" +
            "    \"CODE2\": \"BT\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Bolivia\",\n" +
            "    \"ISD\": \"591\",\n" +
            "    \"CODE1\": \"BOL\",\n" +
            "    \"CODE2\": \"BO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Bosnia and Herzegovina\",\n" +
            "    \"ISD\": \"387\",\n" +
            "    \"CODE1\": \"BIH\",\n" +
            "    \"CODE2\": \"BA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Botswana\",\n" +
            "    \"ISD\": \"267\",\n" +
            "    \"CODE1\": \"BWA\",\n" +
            "    \"CODE2\": \"BW\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Brazil\",\n" +
            "    \"ISD\": \"55\",\n" +
            "    \"CODE1\": \"BRA\",\n" +
            "    \"CODE2\": \"BR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"British Indian Ocean Territory\",\n" +
            "    \"ISD\": \"246\",\n" +
            "    \"CODE1\": \"IOT\",\n" +
            "    \"CODE2\": \"IO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"British Virgin Islands\",\n" +
            "    \"ISD\": \"1284\",\n" +
            "    \"CODE1\": \"VGB\",\n" +
            "    \"CODE2\": \"VG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Brunei\",\n" +
            "    \"ISD\": \"673\",\n" +
            "    \"CODE1\": \"BRN\",\n" +
            "    \"CODE2\": \"BN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Bulgaria\",\n" +
            "    \"ISD\": \"359\",\n" +
            "    \"CODE1\": \"BGR\",\n" +
            "    \"CODE2\": \"BG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Burkina Faso\",\n" +
            "    \"ISD\": \"226\",\n" +
            "    \"CODE1\": \"BFA\",\n" +
            "    \"CODE2\": \"BF\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Myanmar\",\n" +
            "    \"ISD\": \"95\",\n" +
            "    \"CODE1\": \"MMR\",\n" +
            "    \"CODE2\": \"MM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Burundi\",\n" +
            "    \"ISD\": \"257\",\n" +
            "    \"CODE1\": \"BDI\",\n" +
            "    \"CODE2\": \"BI\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Cambodia\",\n" +
            "    \"ISD\": \"855\",\n" +
            "    \"CODE1\": \"KHM\",\n" +
            "    \"CODE2\": \"KH\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Cameroon\",\n" +
            "    \"ISD\": \"237\",\n" +
            "    \"CODE1\": \"CMR\",\n" +
            "    \"CODE2\": \"CM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Canada\",\n" +
            "    \"ISD\": \"1\",\n" +
            "    \"CODE1\": \"CAN\",\n" +
            "    \"CODE2\": \"CA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Cape Verde\",\n" +
            "    \"ISD\": \"238\",\n" +
            "    \"CODE1\": \"CPV\",\n" +
            "    \"CODE2\": \"CV\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Cayman Islands\",\n" +
            "    \"ISD\": \"1345\",\n" +
            "    \"CODE1\": \"CYM\",\n" +
            "    \"CODE2\": \"KY\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Central African Republic\",\n" +
            "    \"ISD\": \"236\",\n" +
            "    \"CODE1\": \"CAF\",\n" +
            "    \"CODE2\": \"CF\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Chad\",\n" +
            "    \"ISD\": \"235\",\n" +
            "    \"CODE1\": \"TCD\",\n" +
            "    \"CODE2\": \"TD\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Chile\",\n" +
            "    \"ISD\": \"56\",\n" +
            "    \"CODE1\": \"CHL\",\n" +
            "    \"CODE2\": \"CL\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"China\",\n" +
            "    \"ISD\": \"86\",\n" +
            "    \"CODE1\": \"CHN\",\n" +
            "    \"CODE2\": \"CN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Christmas Island\",\n" +
            "    \"ISD\": \"61\",\n" +
            "    \"CODE1\": \"CXR\",\n" +
            "    \"CODE2\": \"CX\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Cocos Islands\",\n" +
            "    \"ISD\": \"61\",\n" +
            "    \"CODE1\": \"CCK\",\n" +
            "    \"CODE2\": \"CC\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Colombia\",\n" +
            "    \"ISD\": \"57\",\n" +
            "    \"CODE1\": \"COL\",\n" +
            "    \"CODE2\": \"CO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Comoros\",\n" +
            "    \"ISD\": \"269\",\n" +
            "    \"CODE1\": \"COM\",\n" +
            "    \"CODE2\": \"KM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Republic of the Congo\",\n" +
            "    \"ISD\": \"242\",\n" +
            "    \"CODE1\": \"COG\",\n" +
            "    \"CODE2\": \"CG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Democratic Republic of the Congo\",\n" +
            "    \"ISD\": \"243\",\n" +
            "    \"CODE1\": \"COD\",\n" +
            "    \"CODE2\": \"CD\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Cook Islands\",\n" +
            "    \"ISD\": \"682\",\n" +
            "    \"CODE1\": \"COK\",\n" +
            "    \"CODE2\": \"CK\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Costa Rica\",\n" +
            "    \"ISD\": \"506\",\n" +
            "    \"CODE1\": \"CRI\",\n" +
            "    \"CODE2\": \"CR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Croatia\",\n" +
            "    \"ISD\": \"385\",\n" +
            "    \"CODE1\": \"HRV\",\n" +
            "    \"CODE2\": \"HR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Cuba\",\n" +
            "    \"ISD\": \"53\",\n" +
            "    \"CODE1\": \"CUB\",\n" +
            "    \"CODE2\": \"CU\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Curacao\",\n" +
            "    \"ISD\": \"599\",\n" +
            "    \"CODE1\": \"CUW\",\n" +
            "    \"CODE2\": \"CW\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Cyprus\",\n" +
            "    \"ISD\": \"357\",\n" +
            "    \"CODE1\": \"CYP\",\n" +
            "    \"CODE2\": \"CY\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Czech Republic\",\n" +
            "    \"ISD\": \"420\",\n" +
            "    \"CODE1\": \"CZE\",\n" +
            "    \"CODE2\": \"CZ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Denmark\",\n" +
            "    \"ISD\": \"45\",\n" +
            "    \"CODE1\": \"DNK\",\n" +
            "    \"CODE2\": \"DK\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Djibouti\",\n" +
            "    \"ISD\": \"253\",\n" +
            "    \"CODE1\": \"DJI\",\n" +
            "    \"CODE2\": \"DJ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Dominica\",\n" +
            "    \"ISD\": \"1767\",\n" +
            "    \"CODE1\": \"DMA\",\n" +
            "    \"CODE2\": \"DM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Dominican Republic\",\n" +
            "    \"ISD\": \"1809\",\n" +
            "    \"CODE1\": \"DOM\",\n" +
            "    \"CODE2\": \"DO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Dominican Republic\",\n" +
            "    \"ISD\": \"1829\",\n" +
            "    \"CODE1\": \"DOM\",\n" +
            "    \"CODE2\": \"DO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Dominican Republic\",\n" +
            "    \"ISD\": \"1849\",\n" +
            "    \"CODE1\": \"DOM\",\n" +
            "    \"CODE2\": \"DO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"East Timor\",\n" +
            "    \"ISD\": \"670\",\n" +
            "    \"CODE1\": \"TLS\",\n" +
            "    \"CODE2\": \"TL\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Ecuador\",\n" +
            "    \"ISD\": \"593\",\n" +
            "    \"CODE1\": \"ECU\",\n" +
            "    \"CODE2\": \"EC\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Egypt\",\n" +
            "    \"ISD\": \"20\",\n" +
            "    \"CODE1\": \"EGY\",\n" +
            "    \"CODE2\": \"EG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"El Salvador\",\n" +
            "    \"ISD\": \"503\",\n" +
            "    \"CODE1\": \"SLV\",\n" +
            "    \"CODE2\": \"SV\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Equatorial Guinea\",\n" +
            "    \"ISD\": \"240\",\n" +
            "    \"CODE1\": \"GNQ\",\n" +
            "    \"CODE2\": \"GQ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Eritrea\",\n" +
            "    \"ISD\": \"291\",\n" +
            "    \"CODE1\": \"ERI\",\n" +
            "    \"CODE2\": \"ER\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Estonia\",\n" +
            "    \"ISD\": \"372\",\n" +
            "    \"CODE1\": \"EST\",\n" +
            "    \"CODE2\": \"EE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Ethiopia\",\n" +
            "    \"ISD\": \"251\",\n" +
            "    \"CODE1\": \"ETH\",\n" +
            "    \"CODE2\": \"ET\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Falkland Islands\",\n" +
            "    \"ISD\": \"500\",\n" +
            "    \"CODE1\": \"FLK\",\n" +
            "    \"CODE2\": \"FK\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Faroe Islands\",\n" +
            "    \"ISD\": \"298\",\n" +
            "    \"CODE1\": \"FRO\",\n" +
            "    \"CODE2\": \"FO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Fiji\",\n" +
            "    \"ISD\": \"679\",\n" +
            "    \"CODE1\": \"FJI\",\n" +
            "    \"CODE2\": \"FJ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Finland\",\n" +
            "    \"ISD\": \"358\",\n" +
            "    \"CODE1\": \"FIN\",\n" +
            "    \"CODE2\": \"FI\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"France\",\n" +
            "    \"ISD\": \"33\",\n" +
            "    \"CODE1\": \"FRA\",\n" +
            "    \"CODE2\": \"FR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"French Polynesia\",\n" +
            "    \"ISD\": \"689\",\n" +
            "    \"CODE1\": \"PYF\",\n" +
            "    \"CODE2\": \"PF\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Gabon\",\n" +
            "    \"ISD\": \"241\",\n" +
            "    \"CODE1\": \"GAB\",\n" +
            "    \"CODE2\": \"GA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Gambia\",\n" +
            "    \"ISD\": \"220\",\n" +
            "    \"CODE1\": \"GMB\",\n" +
            "    \"CODE2\": \"GM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Georgia\",\n" +
            "    \"ISD\": \"995\",\n" +
            "    \"CODE1\": \"GEO\",\n" +
            "    \"CODE2\": \"GE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Germany\",\n" +
            "    \"ISD\": \"49\",\n" +
            "    \"CODE1\": \"DEU\",\n" +
            "    \"CODE2\": \"DE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Ghana\",\n" +
            "    \"ISD\": \"233\",\n" +
            "    \"CODE1\": \"GHA\",\n" +
            "    \"CODE2\": \"GH\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Gibraltar\",\n" +
            "    \"ISD\": \"350\",\n" +
            "    \"CODE1\": \"GIB\",\n" +
            "    \"CODE2\": \"GI\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Greece\",\n" +
            "    \"ISD\": \"30\",\n" +
            "    \"CODE1\": \"GRC\",\n" +
            "    \"CODE2\": \"GR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Greenland\",\n" +
            "    \"ISD\": \"299\",\n" +
            "    \"CODE1\": \"GRL\",\n" +
            "    \"CODE2\": \"GL\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Grenada\",\n" +
            "    \"ISD\": \"1473\",\n" +
            "    \"CODE1\": \"GRD\",\n" +
            "    \"CODE2\": \"GD\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Guam\",\n" +
            "    \"ISD\": \"1671\",\n" +
            "    \"CODE1\": \"GUM\",\n" +
            "    \"CODE2\": \"GU\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Guatemala\",\n" +
            "    \"ISD\": \"502\",\n" +
            "    \"CODE1\": \"GTM\",\n" +
            "    \"CODE2\": \"GT\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Guernsey\",\n" +
            "    \"ISD\": \"441481\",\n" +
            "    \"CODE1\": \"GGY\",\n" +
            "    \"CODE2\": \"GG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Guinea\",\n" +
            "    \"ISD\": \"224\",\n" +
            "    \"CODE1\": \"GIN\",\n" +
            "    \"CODE2\": \"GN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Guinea-Bissau\",\n" +
            "    \"ISD\": \"245\",\n" +
            "    \"CODE1\": \"GNB\",\n" +
            "    \"CODE2\": \"GW\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Guyana\",\n" +
            "    \"ISD\": \"592\",\n" +
            "    \"CODE1\": \"GUY\",\n" +
            "    \"CODE2\": \"GY\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Haiti\",\n" +
            "    \"ISD\": \"509\",\n" +
            "    \"CODE1\": \"HTI\",\n" +
            "    \"CODE2\": \"HT\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Honduras\",\n" +
            "    \"ISD\": \"504\",\n" +
            "    \"CODE1\": \"HND\",\n" +
            "    \"CODE2\": \"HN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Hong Kong\",\n" +
            "    \"ISD\": \"852\",\n" +
            "    \"CODE1\": \"HKG\",\n" +
            "    \"CODE2\": \"HK\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Hungary\",\n" +
            "    \"ISD\": \"36\",\n" +
            "    \"CODE1\": \"HUN\",\n" +
            "    \"CODE2\": \"HU\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Iceland\",\n" +
            "    \"ISD\": \"354\",\n" +
            "    \"CODE1\": \"ISL\",\n" +
            "    \"CODE2\": \"IS\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"India\",\n" +
            "    \"ISD\": \"91\",\n" +
            "    \"CODE1\": \"IND\",\n" +
            "    \"CODE2\": \"IN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Indonesia\",\n" +
            "    \"ISD\": \"62\",\n" +
            "    \"CODE1\": \"IDN\",\n" +
            "    \"CODE2\": \"ID\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Iran\",\n" +
            "    \"ISD\": \"98\",\n" +
            "    \"CODE1\": \"IRN\",\n" +
            "    \"CODE2\": \"IR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Iraq\",\n" +
            "    \"ISD\": \"964\",\n" +
            "    \"CODE1\": \"IRQ\",\n" +
            "    \"CODE2\": \"IQ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Ireland\",\n" +
            "    \"ISD\": \"353\",\n" +
            "    \"CODE1\": \"IRL\",\n" +
            "    \"CODE2\": \"IE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Isle of Man\",\n" +
            "    \"ISD\": \"441624\",\n" +
            "    \"CODE1\": \"IMN\",\n" +
            "    \"CODE2\": \"IM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Israel\",\n" +
            "    \"ISD\": \"972\",\n" +
            "    \"CODE1\": \"ISR\",\n" +
            "    \"CODE2\": \"IL\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Italy\",\n" +
            "    \"ISD\": \"39\",\n" +
            "    \"CODE1\": \"ITA\",\n" +
            "    \"CODE2\": \"IT\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Ivory Coast\",\n" +
            "    \"ISD\": \"225\",\n" +
            "    \"CODE1\": \"CIV\",\n" +
            "    \"CODE2\": \"CI\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Jamaica\",\n" +
            "    \"ISD\": \"1876\",\n" +
            "    \"CODE1\": \"JAM\",\n" +
            "    \"CODE2\": \"JM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Japan\",\n" +
            "    \"ISD\": \"81\",\n" +
            "    \"CODE1\": \"JPN\",\n" +
            "    \"CODE2\": \"JP\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Jersey\",\n" +
            "    \"ISD\": \"441534\",\n" +
            "    \"CODE1\": \"JEY\",\n" +
            "    \"CODE2\": \"JE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Jordan\",\n" +
            "    \"ISD\": \"962\",\n" +
            "    \"CODE1\": \"JOR\",\n" +
            "    \"CODE2\": \"JO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Kazakhstan\",\n" +
            "    \"ISD\": \"7\",\n" +
            "    \"CODE1\": \"KAZ\",\n" +
            "    \"CODE2\": \"KZ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Kenya\",\n" +
            "    \"ISD\": \"254\",\n" +
            "    \"CODE1\": \"KEN\",\n" +
            "    \"CODE2\": \"KE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Kiribati\",\n" +
            "    \"ISD\": \"686\",\n" +
            "    \"CODE1\": \"KIR\",\n" +
            "    \"CODE2\": \"KI\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Kosovo\",\n" +
            "    \"ISD\": \"383\",\n" +
            "    \"CODE1\": \"XKX\",\n" +
            "    \"CODE2\": \"XK\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Kuwait\",\n" +
            "    \"ISD\": \"965\",\n" +
            "    \"CODE1\": \"KWT\",\n" +
            "    \"CODE2\": \"KW\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Kyrgyzstan\",\n" +
            "    \"ISD\": \"996\",\n" +
            "    \"CODE1\": \"KGZ\",\n" +
            "    \"CODE2\": \"KG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Laos\",\n" +
            "    \"ISD\": \"856\",\n" +
            "    \"CODE1\": \"LAO\",\n" +
            "    \"CODE2\": \"LA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Latvia\",\n" +
            "    \"ISD\": \"371\",\n" +
            "    \"CODE1\": \"LVA\",\n" +
            "    \"CODE2\": \"LV\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Lebanon\",\n" +
            "    \"ISD\": \"961\",\n" +
            "    \"CODE1\": \"LBN\",\n" +
            "    \"CODE2\": \"LB\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Lesotho\",\n" +
            "    \"ISD\": \"266\",\n" +
            "    \"CODE1\": \"LSO\",\n" +
            "    \"CODE2\": \"LS\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Liberia\",\n" +
            "    \"ISD\": \"231\",\n" +
            "    \"CODE1\": \"LBR\",\n" +
            "    \"CODE2\": \"LR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Libya\",\n" +
            "    \"ISD\": \"218\",\n" +
            "    \"CODE1\": \"LBY\",\n" +
            "    \"CODE2\": \"LY\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Liechtenstein\",\n" +
            "    \"ISD\": \"423\",\n" +
            "    \"CODE1\": \"LIE\",\n" +
            "    \"CODE2\": \"LI\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Lithuania\",\n" +
            "    \"ISD\": \"370\",\n" +
            "    \"CODE1\": \"LTU\",\n" +
            "    \"CODE2\": \"LT\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Luxembourg\",\n" +
            "    \"ISD\": \"352\",\n" +
            "    \"CODE1\": \"LUX\",\n" +
            "    \"CODE2\": \"LU\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Macau\",\n" +
            "    \"ISD\": \"853\",\n" +
            "    \"CODE1\": \"MAC\",\n" +
            "    \"CODE2\": \"MO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Macedonia\",\n" +
            "    \"ISD\": \"389\",\n" +
            "    \"CODE1\": \"MKD\",\n" +
            "    \"CODE2\": \"MK\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Madagascar\",\n" +
            "    \"ISD\": \"261\",\n" +
            "    \"CODE1\": \"MDG\",\n" +
            "    \"CODE2\": \"MG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Malawi\",\n" +
            "    \"ISD\": \"265\",\n" +
            "    \"CODE1\": \"MWI\",\n" +
            "    \"CODE2\": \"MW\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Malaysia\",\n" +
            "    \"ISD\": \"60\",\n" +
            "    \"CODE1\": \"MYS\",\n" +
            "    \"CODE2\": \"MY\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Maldives\",\n" +
            "    \"ISD\": \"960\",\n" +
            "    \"CODE1\": \"MDV\",\n" +
            "    \"CODE2\": \"MV\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Mali\",\n" +
            "    \"ISD\": \"223\",\n" +
            "    \"CODE1\": \"MLI\",\n" +
            "    \"CODE2\": \"ML\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Malta\",\n" +
            "    \"ISD\": \"356\",\n" +
            "    \"CODE1\": \"MLT\",\n" +
            "    \"CODE2\": \"MT\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Marshall Islands\",\n" +
            "    \"ISD\": \"692\",\n" +
            "    \"CODE1\": \"MHL\",\n" +
            "    \"CODE2\": \"MH\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Mauritania\",\n" +
            "    \"ISD\": \"222\",\n" +
            "    \"CODE1\": \"MRT\",\n" +
            "    \"CODE2\": \"MR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Mauritius\",\n" +
            "    \"ISD\": \"230\",\n" +
            "    \"CODE1\": \"MUS\",\n" +
            "    \"CODE2\": \"MU\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Mayotte\",\n" +
            "    \"ISD\": \"262\",\n" +
            "    \"CODE1\": \"MYT\",\n" +
            "    \"CODE2\": \"YT\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Mexico\",\n" +
            "    \"ISD\": \"52\",\n" +
            "    \"CODE1\": \"MEX\",\n" +
            "    \"CODE2\": \"MX\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Micronesia\",\n" +
            "    \"ISD\": \"691\",\n" +
            "    \"CODE1\": \"FSM\",\n" +
            "    \"CODE2\": \"FM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Moldova\",\n" +
            "    \"ISD\": \"373\",\n" +
            "    \"CODE1\": \"MDA\",\n" +
            "    \"CODE2\": \"MD\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Monaco\",\n" +
            "    \"ISD\": \"377\",\n" +
            "    \"CODE1\": \"MCO\",\n" +
            "    \"CODE2\": \"MC\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Mongolia\",\n" +
            "    \"ISD\": \"976\",\n" +
            "    \"CODE1\": \"MNG\",\n" +
            "    \"CODE2\": \"MN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Montenegro\",\n" +
            "    \"ISD\": \"382\",\n" +
            "    \"CODE1\": \"MNE\",\n" +
            "    \"CODE2\": \"ME\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Montserrat\",\n" +
            "    \"ISD\": \"1664\",\n" +
            "    \"CODE1\": \"MSR\",\n" +
            "    \"CODE2\": \"MS\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Morocco\",\n" +
            "    \"ISD\": \"212\",\n" +
            "    \"CODE1\": \"MAR\",\n" +
            "    \"CODE2\": \"MA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Mozambique\",\n" +
            "    \"ISD\": \"258\",\n" +
            "    \"CODE1\": \"MOZ\",\n" +
            "    \"CODE2\": \"MZ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Namibia\",\n" +
            "    \"ISD\": \"264\",\n" +
            "    \"CODE1\": \"NAM\",\n" +
            "    \"CODE2\": \"NA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Nauru\",\n" +
            "    \"ISD\": \"674\",\n" +
            "    \"CODE1\": \"NRU\",\n" +
            "    \"CODE2\": \"NR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Nepal\",\n" +
            "    \"ISD\": \"977\",\n" +
            "    \"CODE1\": \"NPL\",\n" +
            "    \"CODE2\": \"NP\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Netherlands\",\n" +
            "    \"ISD\": \"31\",\n" +
            "    \"CODE1\": \"NLD\",\n" +
            "    \"CODE2\": \"NL\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Netherlands Antilles\",\n" +
            "    \"ISD\": \"599\",\n" +
            "    \"CODE1\": \"ANT\",\n" +
            "    \"CODE2\": \"AN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"New Caledonia\",\n" +
            "    \"ISD\": \"687\",\n" +
            "    \"CODE1\": \"NCL\",\n" +
            "    \"CODE2\": \"NC\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"New Zealand\",\n" +
            "    \"ISD\": \"64\",\n" +
            "    \"CODE1\": \"NZL\",\n" +
            "    \"CODE2\": \"NZ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Nicaragua\",\n" +
            "    \"ISD\": \"505\",\n" +
            "    \"CODE1\": \"NIC\",\n" +
            "    \"CODE2\": \"NI\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Niger\",\n" +
            "    \"ISD\": \"227\",\n" +
            "    \"CODE1\": \"NER\",\n" +
            "    \"CODE2\": \"NE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Nigeria\",\n" +
            "    \"ISD\": \"234\",\n" +
            "    \"CODE1\": \"NGA\",\n" +
            "    \"CODE2\": \"NG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Niue\",\n" +
            "    \"ISD\": \"683\",\n" +
            "    \"CODE1\": \"NIU\",\n" +
            "    \"CODE2\": \"NU\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Northern Mariana Islands\",\n" +
            "    \"ISD\": \"1670\",\n" +
            "    \"CODE1\": \"MNP\",\n" +
            "    \"CODE2\": \"MP\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"North Korea\",\n" +
            "    \"ISD\": \"850\",\n" +
            "    \"CODE1\": \"PRK\",\n" +
            "    \"CODE2\": \"KP\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Norway\",\n" +
            "    \"ISD\": \"47\",\n" +
            "    \"CODE1\": \"NOR\",\n" +
            "    \"CODE2\": \"NO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Oman\",\n" +
            "    \"ISD\": \"968\",\n" +
            "    \"CODE1\": \"OMN\",\n" +
            "    \"CODE2\": \"OM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Pakistan\",\n" +
            "    \"ISD\": \"92\",\n" +
            "    \"CODE1\": \"PAK\",\n" +
            "    \"CODE2\": \"PK\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Palau\",\n" +
            "    \"ISD\": \"680\",\n" +
            "    \"CODE1\": \"PLW\",\n" +
            "    \"CODE2\": \"PW\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Palestine\",\n" +
            "    \"ISD\": \"970\",\n" +
            "    \"CODE1\": \"PSE\",\n" +
            "    \"CODE2\": \"PS\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Panama\",\n" +
            "    \"ISD\": \"507\",\n" +
            "    \"CODE1\": \"PAN\",\n" +
            "    \"CODE2\": \"PA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Papua New Guinea\",\n" +
            "    \"ISD\": \"675\",\n" +
            "    \"CODE1\": \"PNG\",\n" +
            "    \"CODE2\": \"PG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Paraguay\",\n" +
            "    \"ISD\": \"595\",\n" +
            "    \"CODE1\": \"PRY\",\n" +
            "    \"CODE2\": \"PY\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Peru\",\n" +
            "    \"ISD\": \"51\",\n" +
            "    \"CODE1\": \"PER\",\n" +
            "    \"CODE2\": \"PE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Philippines\",\n" +
            "    \"ISD\": \"63\",\n" +
            "    \"CODE1\": \"PHL\",\n" +
            "    \"CODE2\": \"PH\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Pitcairn\",\n" +
            "    \"ISD\": \"64\",\n" +
            "    \"CODE1\": \"PCN\",\n" +
            "    \"CODE2\": \"PN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Poland\",\n" +
            "    \"ISD\": \"48\",\n" +
            "    \"CODE1\": \"POL\",\n" +
            "    \"CODE2\": \"PL\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Portugal\",\n" +
            "    \"ISD\": \"351\",\n" +
            "    \"CODE1\": \"PRT\",\n" +
            "    \"CODE2\": \"PT\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Puerto Rico\",\n" +
            "    \"ISD\": \"1787\",\n" +
            "    \"CODE1\": \"PRI\",\n" +
            "    \"CODE2\": \"PR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Puerto Rico\",\n" +
            "    \"ISD\": \"1939\",\n" +
            "    \"CODE1\": \"PRI\",\n" +
            "    \"CODE2\": \"PR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Qatar\",\n" +
            "    \"ISD\": \"974\",\n" +
            "    \"CODE1\": \"QAT\",\n" +
            "    \"CODE2\": \"QA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Reunion\",\n" +
            "    \"ISD\": \"262\",\n" +
            "    \"CODE1\": \"REU\",\n" +
            "    \"CODE2\": \"RE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Romania\",\n" +
            "    \"ISD\": \"40\",\n" +
            "    \"CODE1\": \"ROU\",\n" +
            "    \"CODE2\": \"RO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Russia\",\n" +
            "    \"ISD\": \"7\",\n" +
            "    \"CODE1\": \"RUS\",\n" +
            "    \"CODE2\": \"RU\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Rwanda\",\n" +
            "    \"ISD\": \"250\",\n" +
            "    \"CODE1\": \"RWA\",\n" +
            "    \"CODE2\": \"RW\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Saint Barthelemy\",\n" +
            "    \"ISD\": \"590\",\n" +
            "    \"CODE1\": \"BLM\",\n" +
            "    \"CODE2\": \"BL\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Samoa\",\n" +
            "    \"ISD\": \"685\",\n" +
            "    \"CODE1\": \"WSM\",\n" +
            "    \"CODE2\": \"WS\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"San Marino\",\n" +
            "    \"ISD\": \"378\",\n" +
            "    \"CODE1\": \"SMR\",\n" +
            "    \"CODE2\": \"SM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Sao Tome and Principe\",\n" +
            "    \"ISD\": \"239\",\n" +
            "    \"CODE1\": \"STP\",\n" +
            "    \"CODE2\": \"ST\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Saudi Arabia\",\n" +
            "    \"ISD\": \"966\",\n" +
            "    \"CODE1\": \"SAU\",\n" +
            "    \"CODE2\": \"SA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Senegal\",\n" +
            "    \"ISD\": \"221\",\n" +
            "    \"CODE1\": \"SEN\",\n" +
            "    \"CODE2\": \"SN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Serbia\",\n" +
            "    \"ISD\": \"381\",\n" +
            "    \"CODE1\": \"SRB\",\n" +
            "    \"CODE2\": \"RS\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Seychelles\",\n" +
            "    \"ISD\": \"248\",\n" +
            "    \"CODE1\": \"SYC\",\n" +
            "    \"CODE2\": \"SC\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Sierra Leone\",\n" +
            "    \"ISD\": \"232\",\n" +
            "    \"CODE1\": \"SLE\",\n" +
            "    \"CODE2\": \"SL\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Singapore\",\n" +
            "    \"ISD\": \"65\",\n" +
            "    \"CODE1\": \"SGP\",\n" +
            "    \"CODE2\": \"SG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Sint Maarten\",\n" +
            "    \"ISD\": \"1721\",\n" +
            "    \"CODE1\": \"SXM\",\n" +
            "    \"CODE2\": \"SX\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Slovakia\",\n" +
            "    \"ISD\": \"421\",\n" +
            "    \"CODE1\": \"SVK\",\n" +
            "    \"CODE2\": \"SK\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Slovenia\",\n" +
            "    \"ISD\": \"386\",\n" +
            "    \"CODE1\": \"SVN\",\n" +
            "    \"CODE2\": \"SI\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Solomon Islands\",\n" +
            "    \"ISD\": \"677\",\n" +
            "    \"CODE1\": \"SLB\",\n" +
            "    \"CODE2\": \"SB\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Somalia\",\n" +
            "    \"ISD\": \"252\",\n" +
            "    \"CODE1\": \"SOM\",\n" +
            "    \"CODE2\": \"SO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"South Africa\",\n" +
            "    \"ISD\": \"27\",\n" +
            "    \"CODE1\": \"ZAF\",\n" +
            "    \"CODE2\": \"ZA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"South Korea\",\n" +
            "    \"ISD\": \"82\",\n" +
            "    \"CODE1\": \"KOR\",\n" +
            "    \"CODE2\": \"KR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"South Sudan\",\n" +
            "    \"ISD\": \"211\",\n" +
            "    \"CODE1\": \"SSD\",\n" +
            "    \"CODE2\": \"SS\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Spain\",\n" +
            "    \"ISD\": \"34\",\n" +
            "    \"CODE1\": \"ESP\",\n" +
            "    \"CODE2\": \"ES\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Sri Lanka\",\n" +
            "    \"ISD\": \"94\",\n" +
            "    \"CODE1\": \"LKA\",\n" +
            "    \"CODE2\": \"LK\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Saint Helena\",\n" +
            "    \"ISD\": \"290\",\n" +
            "    \"CODE1\": \"SHN\",\n" +
            "    \"CODE2\": \"SH\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Saint Kitts and Nevis\",\n" +
            "    \"ISD\": \"1869\",\n" +
            "    \"CODE1\": \"KNA\",\n" +
            "    \"CODE2\": \"KN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Saint Lucia\",\n" +
            "    \"ISD\": \"1758\",\n" +
            "    \"CODE1\": \"LCA\",\n" +
            "    \"CODE2\": \"LC\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Saint Martin\",\n" +
            "    \"ISD\": \"590\",\n" +
            "    \"CODE1\": \"MAF\",\n" +
            "    \"CODE2\": \"MF\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Saint Pierre and Miquelon\",\n" +
            "    \"ISD\": \"508\",\n" +
            "    \"CODE1\": \"SPM\",\n" +
            "    \"CODE2\": \"PM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Saint Vincent and the Grenadines\",\n" +
            "    \"ISD\": \"1784\",\n" +
            "    \"CODE1\": \"VCT\",\n" +
            "    \"CODE2\": \"VC\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Sudan\",\n" +
            "    \"ISD\": \"249\",\n" +
            "    \"CODE1\": \"SDN\",\n" +
            "    \"CODE2\": \"SD\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Suriname\",\n" +
            "    \"ISD\": \"597\",\n" +
            "    \"CODE1\": \"SUR\",\n" +
            "    \"CODE2\": \"SR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Svalbard and Jan Mayen\",\n" +
            "    \"ISD\": \"47\",\n" +
            "    \"CODE1\": \"SJM\",\n" +
            "    \"CODE2\": \"SJ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Swaziland\",\n" +
            "    \"ISD\": \"268\",\n" +
            "    \"CODE1\": \"SWZ\",\n" +
            "    \"CODE2\": \"SZ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Sweden\",\n" +
            "    \"ISD\": \"46\",\n" +
            "    \"CODE1\": \"SWE\",\n" +
            "    \"CODE2\": \"SE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Switzerland\",\n" +
            "    \"ISD\": \"41\",\n" +
            "    \"CODE1\": \"CHE\",\n" +
            "    \"CODE2\": \"CH\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Syria\",\n" +
            "    \"ISD\": \"963\",\n" +
            "    \"CODE1\": \"SYR\",\n" +
            "    \"CODE2\": \"SY\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Taiwan\",\n" +
            "    \"ISD\": \"886\",\n" +
            "    \"CODE1\": \"TWN\",\n" +
            "    \"CODE2\": \"TW\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Tajikistan\",\n" +
            "    \"ISD\": \"992\",\n" +
            "    \"CODE1\": \"TJK\",\n" +
            "    \"CODE2\": \"TJ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Tanzania\",\n" +
            "    \"ISD\": \"255\",\n" +
            "    \"CODE1\": \"TZA\",\n" +
            "    \"CODE2\": \"TZ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Thailand\",\n" +
            "    \"ISD\": \"66\",\n" +
            "    \"CODE1\": \"THA\",\n" +
            "    \"CODE2\": \"TH\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Togo\",\n" +
            "    \"ISD\": \"228\",\n" +
            "    \"CODE1\": \"TGO\",\n" +
            "    \"CODE2\": \"TG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Tokelau\",\n" +
            "    \"ISD\": \"690\",\n" +
            "    \"CODE1\": \"TKL\",\n" +
            "    \"CODE2\": \"TK\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Tonga\",\n" +
            "    \"ISD\": \"676\",\n" +
            "    \"CODE1\": \"TON\",\n" +
            "    \"CODE2\": \"TO\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Trinidad and Tobago\",\n" +
            "    \"ISD\": \"1868\",\n" +
            "    \"CODE1\": \"TTO\",\n" +
            "    \"CODE2\": \"TT\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Tunisia\",\n" +
            "    \"ISD\": \"216\",\n" +
            "    \"CODE1\": \"TUN\",\n" +
            "    \"CODE2\": \"TN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Turkey\",\n" +
            "    \"ISD\": \"90\",\n" +
            "    \"CODE1\": \"TUR\",\n" +
            "    \"CODE2\": \"TR\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Turkmenistan\",\n" +
            "    \"ISD\": \"993\",\n" +
            "    \"CODE1\": \"TKM\",\n" +
            "    \"CODE2\": \"TM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Turks and Caicos Islands\",\n" +
            "    \"ISD\": \"1649\",\n" +
            "    \"CODE1\": \"TCA\",\n" +
            "    \"CODE2\": \"TC\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Tuvalu\",\n" +
            "    \"ISD\": \"688\",\n" +
            "    \"CODE1\": \"TUV\",\n" +
            "    \"CODE2\": \"TV\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"United Arab Emirates\",\n" +
            "    \"ISD\": \"971\",\n" +
            "    \"CODE1\": \"ARE\",\n" +
            "    \"CODE2\": \"AE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Uganda\",\n" +
            "    \"ISD\": \"256\",\n" +
            "    \"CODE1\": \"UGA\",\n" +
            "    \"CODE2\": \"UG\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"United Kingdom\",\n" +
            "    \"ISD\": \"44\",\n" +
            "    \"CODE1\": \"GBR\",\n" +
            "    \"CODE2\": \"GB\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Ukraine\",\n" +
            "    \"ISD\": \"380\",\n" +
            "    \"CODE1\": \"UKR\",\n" +
            "    \"CODE2\": \"UA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Uruguay\",\n" +
            "    \"ISD\": \"598\",\n" +
            "    \"CODE1\": \"URY\",\n" +
            "    \"CODE2\": \"UY\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"United States\",\n" +
            "    \"ISD\": \"1\",\n" +
            "    \"CODE1\": \"USA\",\n" +
            "    \"CODE2\": \"US\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Uzbekistan\",\n" +
            "    \"ISD\": \"998\",\n" +
            "    \"CODE1\": \"UZB\",\n" +
            "    \"CODE2\": \"UZ\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Vanuatu\",\n" +
            "    \"ISD\": \"678\",\n" +
            "    \"CODE1\": \"VUT\",\n" +
            "    \"CODE2\": \"VU\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Vatican\",\n" +
            "    \"ISD\": \"379\",\n" +
            "    \"CODE1\": \"VAT\",\n" +
            "    \"CODE2\": \"VA\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Venezuela\",\n" +
            "    \"ISD\": \"58\",\n" +
            "    \"CODE1\": \"VEN\",\n" +
            "    \"CODE2\": \"VE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Vietnam\",\n" +
            "    \"ISD\": \"84\",\n" +
            "    \"CODE1\": \"VNM\",\n" +
            "    \"CODE2\": \"VN\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"U.S. Virgin Islands\",\n" +
            "    \"ISD\": \"1340\",\n" +
            "    \"CODE1\": \"VIR\",\n" +
            "    \"CODE2\": \"VI\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Wallis and Futuna\",\n" +
            "    \"ISD\": \"681\",\n" +
            "    \"CODE1\": \"WLF\",\n" +
            "    \"CODE2\": \"WF\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Western Sahara\",\n" +
            "    \"ISD\": \"212\",\n" +
            "    \"CODE1\": \"ESH\",\n" +
            "    \"CODE2\": \"EH\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Yemen\",\n" +
            "    \"ISD\": \"967\",\n" +
            "    \"CODE1\": \"YEM\",\n" +
            "    \"CODE2\": \"YE\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Zambia\",\n" +
            "    \"ISD\": \"260\",\n" +
            "    \"CODE1\": \"ZMB\",\n" +
            "    \"CODE2\": \"ZM\"\n" +
            "},\n" +
            "{\n" +
            "    \"NAME\": \"Zimbabwe\",\n" +
            "    \"ISD\": \"263\",\n" +
            "    \"CODE1\": \"ZWE\",\n" +
            "    \"CODE2\": \"ZW\"\n" +
            "}]";
    public static String getISDFromCode2(String code2) {
        try {
            JSONArray jsonArray = new JSONArray(COUNTRY_DATA);

            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject countryObj = jsonArray.getJSONObject(i);

                if (countryObj.has("CODE2") && countryObj.getString("CODE2").equals(code2)) {
                    return countryObj.getString("ISD");
                }
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return null; // Return null if the CODE2 is not found
    }
}