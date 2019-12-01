<?php

use Illuminate\Database\Seeder;

use Faker\Factory as Faker;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $faker = Faker::create();

      DB::table('posts')->insert([
        "title" => "The Lazy Man's Guide To Fashion",
        "content" => $faker->paragraphs(100, true),
        "author" => "bluefish",
        "created_at" => "2014-06-26 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "The A - Z Guide Of Mechanics",
        "content" => $faker->paragraphs(100, true),
        "author" => "cornsilk",
        "created_at" => "2014-06-27 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "Clear And Unbiased Facts About Chocolate",
        "content" => $faker->paragraphs(100, true),
        "author" => "khadia",
        "created_at" => "2014-06-28 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "The Ultimate Guide To The Environment",
        "content" => $faker->paragraphs(100, true),
        "author" => "khadia",
        "created_at" => "2014-07-01 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "Top 3 Ways To Buy A Used Jeep",
        "content" => $faker->paragraphs(100, true),
        "author" => "khadia",
        "created_at" => "2014-07-02 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "What Alberto Savoia Can Teach You About Computer Viruses",
        "content" => $faker->paragraphs(100, true),
        "author" => "cornsilk",
        "created_at" => "2014-07-03 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "How To Take the Headache Out Of Dinner",
        "content" => $faker->paragraphs(100, true),
        "author" => "khadia",
        "created_at" => "2014-07-04 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "A Surprising Tip To Help You Grow Up",
        "content" => $faker->paragraphs(100, true),
        "author" => "khadia",
        "created_at" => "2014-07-05 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "Top 25 Tips On Strength",
        "content" => $faker->paragraphs(100, true),
        "author" => "cornsilk",
        "created_at" => "2014-07-06 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "How Paper Will Change Your Business Strategy",
        "content" => $faker->paragraphs(100, true),
        "author" => "bluefish",
        "created_at" => "2014-07-07 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "SuperEasy Ways To Learn Everything About Cucumbers",
        "content" => $faker->paragraphs(100, true),
        "author" => "cornsilk",
        "created_at" => "2014-07-08 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "Running: What A Mistake!",
        "content" => $faker->paragraphs(100, true),
        "author" => "khadia",
        "created_at" => "2014-07-09 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "Clear And Unbiased Facts About Cooking (Without All the Hype)",
        "content" => $faker->paragraphs(100, true),
        "author" => "cornsilk",
        "created_at" => "2014-07-10 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "How To Fast Track Your Archery Skills",
        "content" => $faker->paragraphs(100, true),
        "author" => "bluefish",
        "created_at" => "2014-07-11 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "5 Secrets Kung Fu Masters Don't Want You To Know",
        "content" => $faker->paragraphs(100, true),
        "author" => "khadia",
        "created_at" => "2014-07-12 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "Seven Doubts You Should Clarify About Ducks",
        "content" => $faker->paragraphs(100, true),
        "author" => "khadia",
        "created_at" => "2014-07-13 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "Learn How To Make More Money With Bill Gates",
        "content" => $faker->paragraphs(100, true),
        "author" => "cornsilk",
        "created_at" => "2014-07-14 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "What I Wish Everyone Knew About Coffee",
        "content" => $faker->paragraphs(100, true),
        "author" => "khadia",
        "created_at" => "2014-07-15 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "How To Start An Orchestra With Less Than $100",
        "content" => $faker->paragraphs(100, true),
        "author" => "bluefish",
        "created_at" => "2014-07-16 00:00:00"
      ]);
      DB::table('posts')->insert([
        "title" => "10 Facts Nobody Told You About Horses",
        "content" => $faker->paragraphs(100, true),
        "author" => "cornsilk",
        "created_at" => "2014-07-17 00:00:00"
      ]);
    }
}
