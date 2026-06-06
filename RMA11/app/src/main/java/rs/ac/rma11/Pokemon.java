package rs.ac.rma11;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class Pokemon {
    private String name;
    private int height;
    private int weight;
    private List<String> types = new ArrayList<>();

    public static Pokemon fromJson(String json) throws Exception {
        JSONObject obj = new JSONObject(json);

        Pokemon p = new Pokemon();
        p.name = obj.getString("name");
        p.height = obj.getInt("height");
        p.weight = obj.getInt("weight");

        JSONArray typesArray = obj.getJSONArray("types");
        for (int i = 0; i < typesArray.length(); i++) {
            JSONObject typeObj = typesArray.getJSONObject(i).getJSONObject("type");
            p.types.add(typeObj.getString("name"));
        }
        return p;
    }

    @Override
    public String toString() {
        return "Name: " + name + "\nHeight: " + height + "\nWeight: " + weight + "\nTypes: " + types;
    }
}
